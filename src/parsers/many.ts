import { P } from "types";

export function many<T>(parser: P<T>): P<T[]> {
  return function* (text) {
    const agendaCollected: T[][] = [[]];
    const agendaRest: string[] = [text];
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
