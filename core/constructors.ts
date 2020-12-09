import { P, IGet, ILook, IFinal, Entry } from "./types";

export function get<T>(fn: (char: string) => P<T>): IGet<T> {
  return Object.assign(fn, { type: "get" as const });
}

export function look<T>(fn: (char: string) => P<T>): ILook<T> {
  return Object.assign(fn, { type: "look" as const });
}

export function finalFromGenerator<T>(gen: Generator<Entry<T>>): IFinal<T> {
  return {
    type: "final",
    iterable: {
      *[Symbol.iterator]() {
        for (const el of gen) {
          yield el;
        }
      },
    },
  };
}
