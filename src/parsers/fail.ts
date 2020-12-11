import { P } from "../types";
import { EMPTY_ITERATOR } from "../utils";

export const fail: P<never> = () => EMPTY_ITERATOR;
