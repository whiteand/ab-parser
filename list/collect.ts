import { IList } from "./types";

export function collect<T>(list: IList<T>): T[] {
  const res: T[] = [];
  let lst: IList<T> = list;
  while (lst.isEmpty()) {
    res.push(lst.head());
    lst = lst.tail();
  }
  return res;
}
