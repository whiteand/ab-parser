/**
 * count n p parses n occurrences of p in sequence.
 * A list of results is returned.
 */

import { P } from "types";

type CountRes<N extends number, T> = N extends 0
  ? []
  : N extends 1
  ? [T]
  : N extends 2
  ? [T, T]
  : N extends 3
  ? [T, T, T]
  : N extends 4
  ? [T, T, T, T]
  : N extends 5
  ? [T, T, T, T, T]
  : N extends 6
  ? [T, T, T, T, T, T]
  : N extends 7
  ? [T, T, T, T, T, T, T]
  : N extends 8
  ? [T, T, T, T, T, T, T, T]
  : T[];

export function count<T, N extends number>(n: N, p: P<T>): P<CountRes<N, T>> {
  if (n < 0) {
    throw new Error("You cannot call count with negative count");
  }
  if (n === 0) {
    return function* (text) {
      yield { value: [] as CountRes<N, T>, rest: text };
    };
  }
  return function* (text) {
    const agendaCollected: T[][] = [[]];
    const agendaRest: string[] = [text];
    while (agendaRest.length > 0) {
      const collected = agendaCollected.pop() as T[];
      const currentRest = agendaRest.pop() as string;

      if (collected.length >= n) {
        yield { value: collected as CountRes<N, T>, rest: currentRest };
        continue;
      }

      const it = p(currentRest);

      while (true) {
        const entry = it.next();
        if (entry.done) break;
        const newArr = collected.concat(entry.value.value);
        const newRest = entry.value.rest;
        agendaCollected.push(newArr);
        agendaRest.push(newRest);
      }
    }
  };
}
