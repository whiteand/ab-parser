import { P } from "types";

/**
 *  Parses and returns the specified character.
 */
export function char<C extends string>(c: C): P<C> {
  if (c.length !== 1) {
    throw new Error("You should pass one character into char");
  }
  return function* (text: string) {
    if (text[0] === c) {
      yield { value: c, rest: text.slice(1) };
    }
  };
}
