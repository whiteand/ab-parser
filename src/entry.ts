export type Entry<T> = { result: T; rest: string };

export function entry<T>(result: T, rest: string): Entry<T> {
  return {
    result,
    rest,
  };
}
