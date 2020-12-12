export interface IDequeue<T> {
  pushStart(e: T): void;
  popStart(): T;
  pushEnd(e: T): void;
  popEnd(): T;
  length: number;
}

interface INode<T> {
  next: INode<T> | null;
  prev: INode<T> | null;
  value: T;
}

export class Dequeue<T> implements IDequeue<T> {
  private first: INode<T> | null;
  private last: INode<T> | null;
  public length: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  public pushStart(e: T): void {
    if (!this.first || !this.last) {
      this.first = {
        value: e,
        next: null,
        prev: null,
      };
      this.last = this.first;
      this.length = 1;
      return;
    }
    const newFirst = {
      value: e,
      prev: null,
      next: this.first,
    };
    this.first.prev = newFirst;
    this.first = newFirst;
    this.length++;
  }
  public pushEnd(e: T): void {
    if (!this.first || !this.last) {
      this.pushStart(e);
      return;
    }
    const newLast = {
      value: e,
      prev: this.last,
      next: null,
    };
    this.last.next = newLast;
    this.last = newLast;
    this.length++;
  }
  public popStart(): T {
    if (!this.first) throw new Error("Cannot pop from empty dequeue");
    if (this.first === this.last) {
      const res = this.first.value;
      this.first = null;
      this.last = null;
      this.length = 0;
      return res;
    }
    const res = this.first.value;
    this.first = this.first.next;
    this.length--;
    return res;
  }
  public popEnd(): T {
    if (!this.last) throw new Error("Cannot pop from empty dequeue");
    if (this.first === this.last) {
      return this.popStart();
    }
    const res = this.last.value;
    this.last = this.last.prev;
    this.length--;
    return res;
  }

  public toString() {
    if (this.length <= 0) return "<>";
    const elements: T[] = [];
    let current = this.first;
    while (current) {
      elements.push(current.value);
      current = current.next;
    }
    return "<" + elements.join(" | ") + ">";
  }
}
