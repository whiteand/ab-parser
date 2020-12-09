import { alt } from "./alt";
import { get, look } from "./constructors";
import { run } from "./run";
import { P } from "./types";

export function bind<T, U>(fn: (value: T) => P<U>, p: P<T>): P<U> {
  switch (p.type) {
    case "fail":
      return p;
    case "get":
      return get((c) => bind(fn, p(c)));
    case "look":
      return look((s) => bind(fn, p(s)));
    case "result":
      return alt(fn(p.current), bind(fn, p.next));
    case "final":
      return {
        type: "final",
        iterable: {
          *[Symbol.iterator]() {
            for (const r of p.iterable) {
              const x = r[0];
              const s = r[1];
              for (const ys of run(fn(x))(s)) {
                yield ys;
              }
            }
          },
        },
      };
  }
}
