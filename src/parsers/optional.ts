import { P } from "types";

export function optional<T>(p: P<T>): P<null> {
  return function* (text) {
    const it = p(text);
    let parsed = false;
    while (true) {
      const entry = it.next();
      if (entry.done) break;
      parsed = true;
      const { value: pValue } = entry;
      yield { value: null, rest: pValue.rest };
    }
    if (!parsed) {
      yield { value: null, rest: text };
    }
  };
}
