import { P } from "types";

export function choice<T>(ps: P<T>[]): P<T> {
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
