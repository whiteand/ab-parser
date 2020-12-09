import { FAIL } from "./fail";
import { Entry, P } from "./types";

export function final<T>(iter: Iterable<Entry<T>>): P<T> {
  const it = iter[Symbol.iterator]();
  const entry = it.next();
  if (entry.done) {
    return FAIL;
  }
  return {
    type: "final",
    iterable: iter,
  };
}
