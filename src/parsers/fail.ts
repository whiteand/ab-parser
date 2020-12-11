import { P } from "../types";

/**
 * Always fails
 */
export const fail: P<never> = function* () {};
