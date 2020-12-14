import { PQueue } from "../ds/PQueue";
import { collect, push, TList } from "../ds/list";
import { Entry, P } from "../types";

type TTask<T> =
  | {
      type: "yield";
      values: T[];
      rest: string;
    }
  | {
      type: "iter";
      parsedEntries: TList<Entry<T>>;
      iterator: Iterator<Entry<T>>;
    };

function getPriority<T>(task: TTask<T>): number {
  if (task.type === "yield") return task.rest.length;
  if (!task.parsedEntries) return Infinity;
  return task.parsedEntries.last.value.rest.length;
}

export function many<T>(parser: P<T>): P<T[]> {
  return function* (text) {
    const callStack = new PQueue<TTask<T>>(getPriority);
    callStack.push({
      type: "yield",
      values: [],
      rest: text,
    });
    callStack.push({
      type: "iter",
      parsedEntries: null,
      iterator: parser(text),
    });
    while (callStack.length > 0) {
      const task = callStack.pop() as TTask<T>;
      if (task.type === "yield") {
        yield { value: task.values, rest: task.rest };
        continue;
      }
      let step = task.iterator.next();
      const { parsedEntries } = task;
      if (step.done) {
        if (!parsedEntries) continue;
        const values = collect(parsedEntries, (e) => e.value);
        const rest = parsedEntries.last.value.rest;
        yield { value: values, rest };
        continue;
      }
      while (!step.done) {
        const entry = step.value;
        callStack.push({
          type: "iter",
          parsedEntries: push(parsedEntries, entry),
          iterator: parser(entry.rest),
        });
        step = task.iterator.next();
      }
      if (parsedEntries) {
        callStack.push({
          type: "yield",
          values: collect(parsedEntries, (e) => e.value),
          rest: parsedEntries?.last.value.rest,
        });
      }
    }
  };
}
