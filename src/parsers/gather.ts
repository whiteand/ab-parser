import { P } from "../types";

export function gather<T>(p: P<T>): P<[string, T]> {
  return function* (text) {
    const it = p(text);
    while (true) {
      const entry = it.next();
      if (entry.done) return;
      const parsed = entry.value;
      const readString = text.substr(0, text.length - parsed.rest.length);
      yield { value: [readString, parsed.value], rest: parsed.rest };
    }
  };
}
