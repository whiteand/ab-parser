import { P } from "types";

/**
 * Succeeds iff we are at the end of input
 */
export const eof: P<null> = function* (text) {
  if (text.length <= 0) {
    yield { value: null, rest: "" };
  }
};
