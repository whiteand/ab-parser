export const DONE_ITERATOR_RESULT = { value: undefined, done: true } as const;
export const EMPTY_ITERATOR: Iterator<any> = {
  next() {
    return DONE_ITERATOR_RESULT;
  },
};

export function iteratorOf<T>(value: T): Iterator<T> {
  let isDone = false;
  return {
    next() {
      if (isDone) return DONE_ITERATOR_RESULT;
      isDone = true;
      return { value, done: false };
    },
  };
}
