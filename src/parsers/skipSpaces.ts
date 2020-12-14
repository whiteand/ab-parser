const START_SPACES_PATTERN = /^\s+/;

/**
 * Skips all whitespace.
 */
export function* skipSpaces(text: string) {
  yield { value: null, rest: text.replace(START_SPACES_PATTERN, "") };
}
