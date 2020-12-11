import { P } from "../types";

/**
 * Parses rest string without consuming
 * @param text input
 */
export const look: P<string> = function* (text) {
  yield { value: text, rest: text };
};
