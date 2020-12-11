import { P } from "../types";

export function left<T>(a: P<T>, b: P<T>): P<T> {
  return function* (text) {
    let isLeftUsed = false;
    const it1 = a(text);
    while (true) {
      const entry = it1.next();
      if (entry.done) break;
      isLeftUsed = true;
      yield entry.value;
    }
    if (isLeftUsed) return;
    const it2 = b(text);
    while (true) {
      const entry = it2.next();
      if (entry.done) return;
      yield entry.value;
    }
  };
}
