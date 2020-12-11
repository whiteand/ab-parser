import { P, PS } from "./types";

export function run<T>(parser: P<T>): PS<T> {
  return parser;
}
