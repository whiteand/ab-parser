import { P } from "../types";
import { EMPTY_ITERATOR } from "../utils";

/**
 * Always fails
 */
export const fail: P<never> = () => EMPTY_ITERATOR;
