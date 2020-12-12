import { P } from "types";
import { fail } from "./fail";

export function choice<T>(ps: P<T>[]): P<T> {
  if (ps.length <= 0) return fail;
  if (ps.length === 1) return ps[0];
  return function* (text) {
    for (let i = 0; i < ps.length; i++) {
      const it = (ps[i] as P<T>)(text);
      while (true) {
        const entry = it.next();
        if (entry.done) break;
        yield entry.value;
      }
    }
  };
}
