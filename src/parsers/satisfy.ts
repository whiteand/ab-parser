import { P } from "../types";
import { EMPTY_ITERATOR, iteratorOf } from "../utils";

/**
 * Consumes and returns the next character, if it satisfies the specified predicate.
 * @param pred is character valid
 */
export function satisfy(pred: (char: string) => boolean): P<string> {
  return (text) =>
    text.length > 0 && pred(text[0] as string)
      ? iteratorOf({ value: text[0], rest: text.slice(1) })
      : EMPTY_ITERATOR;
}
