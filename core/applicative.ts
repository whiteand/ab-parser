import { P } from "./types";
import { FAIL } from "./fail";

export function pure<T>(value: T): P<T> {
  return {
    type: "result",
    current: value,
    next: FAIL,
  };
}
