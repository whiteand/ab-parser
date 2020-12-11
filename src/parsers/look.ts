import { P } from "../types";
import { iteratorOf } from "../utils";

/**
 * Take rest string without consuming
 * @param text input
 */
export const look: P<string> = (text) =>
  iteratorOf({ value: text, rest: text });
