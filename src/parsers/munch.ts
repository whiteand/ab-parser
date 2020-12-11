import { P } from "types";

/**
 * Parses the first zero or more characters satisfying the predicate.
 * Always succeeds, exactly once having consumed all
 * the characters Hence NOT the same as (many (satisfy p))
 */
export function munch(pred: (value: string) => boolean): P<string> {
  return function* (text: string) {
    let res = "";
    for (let i = 0; i < text.length; i++) {
      const c = text[i] as string;
      if (pred(c)) {
        res += c;
      } else {
        break;
      }
    }
    yield { value: res, rest: text.slice(res.length) };
  };
}
