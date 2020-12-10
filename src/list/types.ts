export interface IList<T> extends Iterable<T> {
  isEmpty(): boolean;
  head(): T;
  tail(): IList<T>;
  concat(list: IList<T>): IList<T>;
  prepend(item: T): IList<T>;
  map<U>(fn: (el: T) => U): IList<U>;
}

export function fromIterable<T>(gen: Iterable<T>): IList<T> {
  return {
    isEmpty() {
      const it = gen[Symbol.iterator]();
      const entry = it.next();
      return !!entry.done;
    },
    head() {
      const it = gen[Symbol.iterator]();
      const entry = it.next();
      if (entry.done) {
        throw new Error("cannot read head of empty list");
      }
      return entry.value;
    },
    tail() {
      return fromIterable({
        *[Symbol.iterator]() {
          let it = gen[Symbol.iterator]();
          let entry = it.next();
          if (entry.done) {
            throw new Error("Cannot r ead tail of empty list");
          }
          while (true) {
            entry = it.next();
            if (entry.done) return;
            yield entry.value;
          }
        },
      });
    },
    concat(lst) {
      return fromIterable({
        *[Symbol.iterator]() {
          const it1 = lst[Symbol.iterator]();

          while (true) {
            const entry = it1.next();
            if (entry.done) break;
            yield entry.value;
          }
          const it2 = lst[Symbol.iterator]();
          while (true) {
            const entry = it2.next();
            if (entry.done) break;
            yield entry.value;
          }
        },
      });
    },
    prepend(x) {
      return fromIterable({
        *[Symbol.iterator]() {
          yield x;
          const it = gen[Symbol.iterator]();
          while (true) {
            const entry = it.next();
            if (entry.done) return;
            yield entry.value;
          }
        },
      });
    },
    map<U>(fn: (v: T) => U) {
      return fromIterable({
        *[Symbol.iterator]() {
          const it = gen[Symbol.iterator]();
          while (true) {
            const entry = it.next();
            if (entry.done) return;
            yield fn(entry.value);
          }
        },
      });
    },
    [Symbol.iterator]: gen[Symbol.iterator],
  };
}
