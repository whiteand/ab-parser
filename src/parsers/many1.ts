import { P } from "types";

export function many1<T>(parser: P<T>): P<T[]> {
  return function* (text) {
    const agendaCollected: T[][] = [];
    const agendaRest: string[] = [];
    const firstIt = parser(text);
    while (true) {
      const step = firstIt.next();
      if (step.done) break;
      agendaCollected.push([step.value.value]);
      agendaRest.push(step.value.rest);
    }
    while (agendaRest.length > 0) {
      const collected = agendaCollected.pop() as T[];
      const rest = agendaRest.pop() as string;
      yield { value: collected, rest };
      const it = parser(rest);
      while (true) {
        const itEntry = it.next();
        if (itEntry.done) break;
        agendaCollected.push([...collected, itEntry.value.value]);
        agendaRest.push(itEntry.value.rest);
      }
    }
  };
}
