import { entry, Entry } from "../entry";
import { LazyList } from "../list/LazyList";
import { fromIterable, IList } from "../list/types";
import { ReadS } from "../types";

export interface IGet<T> {
  (c: string): P<T>;
  type: "get";
}
export interface ILook<T> {
  (s: string): P<T>;
  type: "look";
}
export interface IFail {
  type: "fail";
}
export interface IResult<T> {
  type: "result";
  head: T;
  next: P<T>;
}

export interface IFinal<T> {
  type: "final";
  lst: IList<Entry<T>>;
}

export type P<T> = IGet<T> | ILook<T> | IFail | IResult<T> | IFinal<T>;

export function get<T>(fn: (c: string) => P<T>): IGet<T> {
  return Object.assign(fn, { type: "get" as const });
}
export function look<T>(fn: (c: string) => P<T>): ILook<T> {
  return Object.assign(fn, { type: "look" as const });
}
export const FAIL: IFail = Object.freeze({ type: "fail" });

export function fail(): IFail {
  return FAIL;
}

export function result<T>(head: T, next: P<T>): IResult<T> {
  return {
    type: "result",
    head,
    next,
  };
}

export function final<T>(lst: IList<Entry<T>>): IFail | IFinal<T> {
  if (lst.isEmpty()) {
    return fail();
  }
  return {
    type: "final",
    lst: lst,
  };
}

export function fmap<T, U>(fn: (val: T) => U, p: P<T>): P<U> {
  switch (p.type) {
    case "get":
      return get((c) => fmap(fn, p(c)));
    case "look":
      return look((c) => fmap(fn, p(c)));
    case "fail":
      return FAIL;
    case "final":
      return final(p.lst.map((r) => entry(fn(r.result), r.rest)));
    case "result":
      return result(fn(p.head), fmap(fn, p.next));
  }
}

/**
 * Monad and Applicative pure and return
 * @param x
 */
export function pure<T>(x: T): IResult<T> {
  return result(x, FAIL);
}

/**
 * Applicative ap
 * @param px P<X>
 * @param pv P<F(X)>
 */
export function ap<U, Z, V extends (x: U) => Z>(px: P<U>, pv: P<V>): P<Z> {
  return bind(px, (x) => bind(pv, (f) => pure(f(x))));
}

export function bind<T, U>(p: P<T>, k: (val: T) => P<U>): P<U> {
  switch (p.type) {
    case "get":
      return get((c) => bind(p(c), k));
    case "look":
      return look((s) => bind(p(s), k));
    case "fail":
      return FAIL;
    case "result":
      return alt(k(p.head), bind(p.next, k));
    case "final":
      return final(
        fromIterable({
          *[Symbol.iterator]() {
            const it1 = p.lst[Symbol.iterator]();
            while (true) {
              const entry1 = it1.next();
              if (entry1.done) return;
              const { result: x, rest: s } = entry1.value;
              const runnedIt = run(k(x))(s)[Symbol.iterator]();
              while (true) {
                const ysEntry = runnedIt.next();
                if (ysEntry.done) break;
                yield ysEntry.value;
              }
            }
          },
        })
      );
  }
}

/**
 * Alternative empty
 */
export function empty<T>(): P<T> {
  return FAIL;
}

/**
 * <|> from haskell.
 * @param p first option
 * @param v second option
 */
export function alt<T>(p: P<T>, v: P<T>): P<T> {
  //   -- most common case: two gets are combined
  //   Get f1     <|> Get f2     = Get (\c -> f1 c <|> f2 c)
  if (p.type === "get" && v.type === "get") {
    return get((c) => alt(p(c), v(c)));
  }
  //   -- results are delivered as soon as possible
  //   Result x p <|> q          = Result x (p <|> q)
  //   p          <|> Result x q = Result x (p <|> q)
  if (p.type === "result") {
    return result(p.head, alt(p.next, v));
  }
  if (v.type === "result") {
    return result(v.head, alt(p, v.next));
  }
  //   -- fail disappears
  //   Fail       <|> p          = p
  //   p          <|> Fail       = p
  if (p.type === "fail") return v;
  if (v.type === "fail") return p;

  //   Final r       <|> Final t = Final (r <> t)
  if (p.type === "final" && v.type === "final") {
    return final(p.lst.concat(v.lst));
  }
  //   Final (r:|rs) <|> Look f  = Look (\s -> Final (r:|(rs ++ run (f s) s)))
  if (p.type === "final" && v.type === "look") {
    return look((s) => {
      const runned = run(v(s))(s);
      const rs = p.lst.tail();
      const concatted = rs.concat(runned);
      const res = concatted.prepend(p.lst.head());
      return final(res);
    });
  }
  //   Final (r:|rs) <|> p       = Look (\s -> Final (r:|(rs ++ run p s)))
  if (p.type === "final") {
    return look((s) => {
      const r = p.lst.head();
      const rs = p.lst.tail();
      const runned = run(v)(s);
      const concatted = rs.concat(runned);
      const lst = concatted.prepend(r);
      return final(lst);
    });
  }
  //   Look f        <|> Final r = Look (\s -> Final (case run (f s) s of
  //                                 []     -> r
  //                                 (x:xs) -> (x:|xs) <> r))
  if (p.type === "look" && v.type === "final") {
    return look((s) => {
      const runned = run(p(s))(s);
      if (runned.isEmpty()) {
        return v;
      }
      return final(runned.concat(v.lst));
    });
  }
  //   -- two finals are combined
  //   -- final + look becomes one look and one final (=optimization)
  //   -- final + sthg else becomes one look and one final
  //   p             <|> Final r = Look (\s -> Final (case run p s of
  //                                 []     -> r
  //                                 (x:xs) -> (x:|xs) <> r))
  if (v.type === "final") {
    return look((s) => {
      const runned = run(p)(s);
      if (runned.isEmpty()) {
        return v;
      }
      return final(runned.concat(v.lst));
    });
  }
  //   -- look + sthg else floats upwards
  //   Look f     <|> Look g     = Look (\s -> f s <|> g s)
  //   Look f     <|> p          = Look (\s -> f s <|> p)
  //   p          <|> Look f     = Look (\s -> p <|> f s)
  if (p.type === "look" && v.type === "look") {
    return look((s) => alt(p(s), v(s)));
  }
  if (p.type === "look") {
    return look((s) => alt(p(s), v));
  }
  if (v.type === "look") {
    return look((s) => alt(p, v(s)));
  }
  return get((c) => alt(p(c), v(c)));
}
export function run<T>(p: P<T>): ReadS<T> {
  switch (p.type) {
    // run (Get f)         (c:s) = run (f c) s
    case "get":
      return (str) => {
        const c = str[0];
        const s = str.slice(1);
        return run(p(c))(s);
      };
    // run (Look f)        s     = run (f s) s
    case "look":
      return (s) => run(p(s))(s);
    case "result":
      return (s) => {
        const runned = run(p.next)(s);
        return runned.prepend(entry(p.head, s));
      };
    // run (Final (r:|rs)) _     = (r:rs)
    case "final":
      return () => p.lst;
    case "fail":
      return () => LazyList.empty;
  }
}
