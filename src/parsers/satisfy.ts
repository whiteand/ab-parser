import { P } from "../types";
import { EMPTY_ITERATOR, iteratorOf } from "../utils";

export function satisfy(pred: (char: string) => boolean): P<string> {
  return (text) =>
    text.length > 0 && pred(text[0])
      ? iteratorOf({ value: text[0], rest: text.slice(1) })
      : EMPTY_ITERATOR;
}
