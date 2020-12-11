import { P } from "../types";
/**
 * Consumes and returns the next character, if it satisfies the specified predicate.
 * @param pred is character valid
 */
export declare function satisfy(pred: (char: string) => boolean): P<string>;
