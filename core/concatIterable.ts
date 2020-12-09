export function concatIterable<T, U>(
  iter1: Iterable<T>,
  iter2: Iterable<U>
): Iterable<T | U> {
  return {
    *[Symbol.iterator]() {
      for (const e of iter1) {
        yield e;
      }
      for (const e of iter2) {
        yield e;
      }
    },
  };
}
