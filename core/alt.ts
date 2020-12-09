// Alternative P
import { concatIterable } from "./concatIterable";
import { get, look } from "./constructors";
import { FAIL } from "./fail";
import { headtail } from "./headtail";
import { run } from "./run";
import { prependIterable } from "./prependIterable";
import { P } from "./types";

export function empty() {
  return FAIL;
}

export function alt<T>(p: P<T>, q: P<T>): P<T> {
  if (p.type === "get" && q.type === "get") {
    return get((c) => alt(p(c), q(c)));
  }
  if (p.type === "result") {
    return {
      type: "result",
      current: p.current,
      next: alt(p.next, q),
    };
  }
  if (q.type === "result") {
    return {
      type: "result",
      current: q.current,
      next: alt(p, q.next),
    };
  }
  if (p.type === "fail") {
    return q;
  }
  if (q.type === "fail") {
    return p;
  }
  if (p.type === "final" && q.type === "final") {
    return {
      type: "final",
      iterable: concatIterable(p.iterable, q.iterable),
    };
  }
  if (p.type === "final") {
    const { head: r, tail: rs } = headtail(p.iterable);
    if (q.type === "look") {
      return look((str) => {
        const runned = run(q(str))(str);
        const rest = concatIterable(rs, runned);
        return {
          type: "final",
          iterable: prependIterable(r, rest),
        };
      });
    }
    return look((str) => ({
      type: "final",
      iterable: prependIterable(r, concatIterable(rs, run(q)(str))),
    }));
  }
  if (p.type === "look" && q.type === "final") {
    return look((str) => {
      const r = q.iterable;
      const runned = run(p(str))(str);
      return {
        type: "final",
        iterable: concatIterable(runned, r),
      };
    });
  }
  if (q.type === "final") {
    return look((s) => ({
      type: "final",
      iterable: concatIterable(run(p)(s), q.iterable),
    }));
  }
  if (p.type === "look" && q.type === "look") {
    return look((s) => alt(p(s), q(s)));
  }
  if (p.type === "look") {
    return look((s) => alt(p(s), q));
  }
  if (q.type === 'look') {
    return look(s => alt(p, q(s)))
  }
  return get(c => alt(p(c), q(c))
}
