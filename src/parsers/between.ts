import { P } from "types";

export function between<A, B, C>(open: P<A>, close: P<C>, parser: P<B>): P<B> {
  return function* (text) {
    const openIt = open(text);
    while (true) {
      const openItEntry = openIt.next();
      if (openItEntry.done) return;
      const { value: openEntry } = openItEntry;

      const parserIt = parser(openEntry.rest);
      while (true) {
        const parserItEntry = parserIt.next();
        if (parserItEntry.done) break;
        const { value: parserEntry } = parserItEntry;

        const closeIt = close(parserEntry.rest);
        while (true) {
          const closeItEntry = closeIt.next();
          if (closeItEntry.done) break;
          const { value: closeEntry } = closeItEntry;
          yield { value: parserEntry.value, rest: closeEntry.rest };
        }
      }
    }
  };
}
