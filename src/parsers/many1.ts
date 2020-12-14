import { collect, push, TList } from "../ds/list";
import { Entry, P } from "types";

type TTask<T> =
  | {
      type: "yield";
      value: T[];
      rest: string;
    }
  | {
      type: "get";
      parsedEntries: TList<Entry<T>>;
      iterator: Iterator<Entry<T>>;
    };

export function many1<T>(parser: P<T>): P<T[]> {
  return function* (text) {
    const callStack: TTask<T>[] = [
      {
        type: "get",
        parsedEntries: null,
        iterator: parser(text),
      },
    ];
    while (callStack.length > 0) {
      const task = callStack.pop() as TTask<T>;
      if (task.type === "yield") {
        yield { value: task.value, rest: task.rest };
        continue;
      }
      const step = task.iterator.next();
      if (step.done) continue;
      const { value: entry } = step;
      const newParsedEntries = push(task.parsedEntries, entry);
      const newIterator = parser(entry.rest);
      callStack.push(
        task,
        {
          type: "yield",
          value: collect(newParsedEntries, (e) => e.value),
          rest: entry.rest,
        },
        { type: "get", parsedEntries: newParsedEntries, iterator: newIterator }
      );
    }
  };
}
