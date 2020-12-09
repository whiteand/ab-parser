import { P } from "./types";

export function fmap<T, U>(fn: (elem: T) => U, p: P<T>): P<U> {
  switch (p.type) {
    case "fail":
      return p;
    case "get":
      return {
        type: "get",
        get: (char) => fmap(fn, p.get(char)),
      };
    case "look":
      return {
        type: "look",
        look: (str) => fmap(fn, p.look(str)),
      };
    case "result":
      return {
        type: "result",
        current: fn(p.current),
        next: fmap(fn, p.next),
      };
    case "final":
      return {
        type: "final",
        iterator: function* () {
          for (const entry of p.iterator) {
          }
        },
      };
  }
}
