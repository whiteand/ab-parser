import { P, ReadS } from "./types";

const EMPTY_ARR: any[] = [];

export function run<T>(p: P<T>): ReadS<T> {
  switch (p.type) {
    case "get":
      return (str) => {
        return run(p(str[0]))(str.slice(1));
      };
    case "look":
      return (s) => run(p(s))(s);
    case "result":
      return (s) => ({
        *[Symbol.iterator]() {
          yield [p.current, s];
          for (const entry of run(p.next)(s)) {
            yield entry;
          }
        },
      });
    case "final":
      return () => p.iterable;
    default:
      return () => EMPTY_ARR;
  }
}
