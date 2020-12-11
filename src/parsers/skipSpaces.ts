import { P } from "types";

const START_SPACES_PATTERN = /^\s+/;

/**
 * Skips all whitespace.
 */
export function skipSpaces(): P<null> {
  return function* (text) {
    yield { value: null, rest: text.replace(START_SPACES_PATTERN, "") };
  };
}
