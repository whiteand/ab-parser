export function headtail<T>(iter: Iterable<T>): { head: T; tail: Iterable<T> } {
  const it = iter[Symbol.iterator]();
  const entry = it.next();
  if (entry.done) {
    throw new Error("Cannot headtail empty iterable");
  }
  return {
    head: entry.value,
    tail: {
      *[Symbol.iterator]() {
        while (true) {
          const entry = it.next();
          if (entry.done) return;
          yield entry.value;
        }
      },
    },
  };
}
