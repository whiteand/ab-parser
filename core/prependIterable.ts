export function prependIterable<T>(el: T, iter1: Iterable<T>): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      yield el;
      for (const e of iter1) {
        yield e;
      }
    },
  };
}
