import { P } from "types";

/**
 * Parses the first one or more characters satisfying the predicate.
 * Fails if none, else succeeds exactly once having consumed all
 * the characters Hence NOT the same as (many1 (satisfy p))
 */
export function munch1(pred: (value: string) => boolean): P<string> {
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
    if (res.length > 0) {
      yield { value: res, rest: text.slice(res.length) };
    }
  };
}
