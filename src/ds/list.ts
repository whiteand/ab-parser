interface INode<T> {
  value: T;
  prev: INode<T> | null;
}

export type TList<T> = null | { first: INode<T>; last: INode<T> };

export function collect<T, U>(list: TList<T>, f: (item: T) => U): U[] {
  if (!list) return [];
  let current: INode<T> | null = list.last;
  const res: U[] = [];
  while (current && current !== list.first) {
    res.push(f(current.value));
    current = current.prev;
  }
  if (current) {
    res.push(f(current.value));
  }

  res.reverse();

  return res;
}

export function push<T>(list: TList<T>, item: T): TList<T> {
  if (!list) {
    const node: INode<T> = {
      value: item,
      prev: null,
    };
    return { first: node, last: node };
  }
  const newNode = {
    value: item,
    prev: list.last,
  };
  return {
    first: list.first,
    last: newNode,
  };
}

export function pop<T>(list: TList<T>): { value: T | null; list: TList<T> } {
  if (!list) return { value: null, list: null };
  if (list.first === list.last) return { value: list.first.value, list: null };
  const lastNode = list.last;
  const newListLast = lastNode.prev as INode<T>;
  return {
    value: lastNode.value,
    list: { first: list.first, last: newListLast },
  };
}
