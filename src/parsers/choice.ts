import { Dequeue } from "../ds/dequeue";
import { P } from "types";
import { fail } from "./fail";
import { sym } from "./sym";

export function choice<T>(ps: P<T>[]): P<T> {
  if (ps.length <= 0) return fail;
  if (ps.length === 1) return ps[0] as P<T>;
  if (ps.length === 2) return sym(ps[0] as P<T>, ps[1] as P<T>);
  const dequeue = new Dequeue<P<T>>();
  for (let i = 1; i < ps.length; i += 2) {
    dequeue.pushEnd(sym(ps[i] as P<T>, ps[i - 1] as P<T>));
  }
  if (ps.length % 2 === 1) {
    dequeue.pushEnd(ps[ps.length - 1] as P<T>);
  }
  while (dequeue.length >= 2) {
    const first = dequeue.popStart();
    const second = dequeue.popStart();
    dequeue.pushEnd(sym(first, second));
  }
  return dequeue.popStart();
}
