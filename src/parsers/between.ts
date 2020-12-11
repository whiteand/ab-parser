import { P } from "types";

export function between<A, B, C>(open: P<A>, close: P<C>, parser: P<B>): P<B> {
  return function* (text) {
    const opIt = open(text);
    while (true) {
      const openEntry = opIt.next();
      if (openEntry.done) return;
      const valueIt = parser(openEntry.value.rest);
      while (true) {
        const valueItEntry = valueIt.next();
        if (valueItEntry.done) break;
        const closeIt = close(text);
        while (true) {
          const closeItEntry = closeIt.next();
          if (closeItEntry.done) break;
          const rest = closeItEntry.value.rest;
          yield { value: valueItEntry.value.value, rest };
        }
      }
    }
  };
}
