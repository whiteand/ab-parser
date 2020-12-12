interface IQueue<T> {
  push(e: T): void;
  pop(): void;
  length: number;
}

export class PQueue<T> implements IQueue<T> {
  private arr: T[] = [];
  private getPriority: (e: T) => number;
  constructor(getPriority: (value: T) => number) {
    this.getPriority = getPriority;
  }
  public get length() {
    return this.arr.length;
  }
  push(e: T) {
    this.arr.push(e);
  }
  pop(): T {
    if (this.arr.length <= 0)
      throw new Error("Cannot get element of empty queue");

    let minIndex = 0;
    let minPriority = this.getPriority(this.arr[0] as T);
    for (let i = 1; i < this.arr.length; i++) {
      const item = this.arr[i] as T;
      const itemPriority = this.getPriority(item);
      if (itemPriority < minPriority) {
        minIndex = i;
        minPriority = itemPriority;
      }
    }
    const minItem = this.arr[minIndex];
    this.arr.splice(minIndex, 1);
    return minItem as T;
  }
}
