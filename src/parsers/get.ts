import { P } from "../types";
import { EMPTY_ITERATOR, iteratorOf } from "../utils";

/**
 * Parses single char
 */
export const get: P<string> = (text) =>
  text.length > 0
    ? iteratorOf({ value: text[0], rest: text.slice(1) })
    : EMPTY_ITERATOR;
