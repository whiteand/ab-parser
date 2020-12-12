import { P } from "types";

/**
 * option x p will either parse p or return x without consuming any input.
 * @param defaultValue default value
 * @param p parser
 */
export function option<T>(defaultValue: T, p: P<T>): P<T> {
  return function* (text) {
    const it = p(text);
    let parsed = false;
    while (true) {
      const itEntry = it.next();
      if (itEntry.done) break;
      parsed = true;
      yield itEntry.value;
    }
    if (!parsed) {
      yield { value: defaultValue, rest: text };
    }
  };
}
