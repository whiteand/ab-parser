import { P } from "../types";

export function sym<T>(a: P<T>, b: P<T>): P<T> {
  return function* (text) {
    const it1 = a(text);
    while (true) {
      const entry = it1.next();
      if (entry.done) break;
      yield entry.value;
    }

    const it2 = b(text);
    while (true) {
      const entry = it2.next();
      if (entry.done) break;
      yield entry.value;
    }
  };
}
