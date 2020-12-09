import { finalFromGenerator } from "./constructors";
import { ReadP } from "./types";

export function readPfmap<U, V, B>(
  h: (val: U) => V,
  f: ReadP<U, B>
): ReadP<V, B> {
  return (k) => f((x) => k(h(x)));
}

export function readPPure<A, B>(x: A) {
  return (next: (v: A) => B) => next(x);
}

export function readPBind<A,B,C>(fn: (a: A) => )
