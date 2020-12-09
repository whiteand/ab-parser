import { get, look } from "./constructors";
import { P } from "./types";

export function fmap<T, U>(fn: (elem: T) => U, p: P<T>): P<U> {
  switch (p.type) {
    case "fail":
      return p;
    case "get":
      return get((char) => fmap(fn, p(char)));
    case "look":
      return look((str) => fmap(fn, p(str)));
    case "result":
      return {
        type: "result",
        current: fn(p.current),
        next: fmap(fn, p.next),
      };
    case "final":
      return {
        type: "final",
        iterable: {
          *[Symbol.iterator]() {
            for (const entry of p.iterable) {
              yield [fn(entry[0]), entry[1]];
            }
          },
        },
      };
  }
}
