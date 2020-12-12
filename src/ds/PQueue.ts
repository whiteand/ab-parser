interface IQueue<T> {
  push(e: T): void;
  pop(): void;
  length: number;
}

interface INode<T> {
  value: T;
  next: INode<T> | null;
  prev: INode<T> | null;
}

export class PQueue<T> implements IQueue<T> {
  private getPriority: (value: T) => number;
  private start;
  constructor(getPriority: (value: T) => number) {
    this.getPriority = getPriority;
  }
}
