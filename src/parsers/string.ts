import { P } from "types";

/**
 * Parses and returns the specified string.
 */
export function string<S extends string>(str: S): P<S> {
  return function* (text) {
    if (text.startsWith(str)) {
      yield { value: str, rest: text.slice(str.length) };
    }
  };
}
