import { P } from "../types";
import { many1 } from "./many1";

export function many<T>(parser: P<T>): P<T[]> {
  const many1Parser = many1(parser);
  return function* (text) {
    const many1Iterator = many1Parser(text);
    while (true) {
      const step = many1Iterator.next();
      if (step.done) {
        break;
      }
      yield step.value;
    }
    yield { value: [], rest: text };
  };
}
