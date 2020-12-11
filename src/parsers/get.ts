import { Entry } from "../types";

/**
 * Parses single char
 */
export function* get(text: string): Iterator<Entry<string>> {
  if (text.length > 0) {
    yield { value: text[0] as string, rest: text.slice(1) };
  }
}
