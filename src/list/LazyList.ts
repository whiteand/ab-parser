import { collect } from "./collect";
import { IList } from "./types";

enum NotEmptyStateCode {
  FullLazy = 1,
  HeadCalculated = 5,
  TailCalculated = 3,
  FullCalculated = 7,
}

export type NonEmptyState<T> =
  | {
      readonly code: typeof NotEmptyStateCode.FullCalculated;
      readonly head: T;
      readonly tail: IList<T>;
    }
  | {
      readonly code: typeof NotEmptyStateCode.HeadCalculated;
      readonly head: T;
      readonly tail: () => IList<T>;
    }
  | {
      readonly code: typeof NotEmptyStateCode.TailCalculated;
      readonly head: () => T;
      readonly tail: IList<T>;
    }
  | {
      readonly code: typeof NotEmptyStateCode.FullLazy;
      readonly head: () => T;
      readonly tail: () => IList<T>;
    };

type State<T> = null | NonEmptyState<T>;

// type NonEmptyStateCode = typeof NOT_EMPTY_STATE_CODE[keyof typeof NOT_EMPTY_STATE_CODE];

export class LazyList<T> implements IList<T> {
  private state: State<T>;
  constructor(state: State<T>) {
    this.state = state;
  }
  isEmpty(): this is { state: null } {
    return !this.state;
  }
  static empty: LazyList<any> = new LazyList(null);

  head(): T {
    if (!this.state) throw new Error("Cannot get head of empty list");
    switch (this.state.code) {
      case NotEmptyStateCode.FullLazy:
        const fromLazyHead = this.state.head();
        this.state = {
          code: NotEmptyStateCode.HeadCalculated,
          head: fromLazyHead,
          tail: this.state.tail,
        };
        return fromLazyHead;
      case NotEmptyStateCode.HeadCalculated:
        return this.state.head;
      case NotEmptyStateCode.TailCalculated:
        const head = this.state.head();
        this.state = {
          code: NotEmptyStateCode.FullCalculated,
          head: head,
          tail: this.state.tail,
        };
        return head;
      case NotEmptyStateCode.FullCalculated:
        return this.state.head;
    }
  }
  tail(): IList<T> {
    if (!this.state) throw new Error("Cannot get tail of empty list");
    switch (this.state.code) {
      case NotEmptyStateCode.FullLazy:
        const fromLazyTail = this.state.tail();
        this.state = {
          code: NotEmptyStateCode.TailCalculated,
          head: this.state.head,
          tail: fromLazyTail,
        };
        return fromLazyTail;
      case NotEmptyStateCode.HeadCalculated:
        const fromLazyTail2 = this.state.tail();
        this.state = {
          code: NotEmptyStateCode.FullCalculated,
          head: this.state.head,
          tail: fromLazyTail2,
        };
        return fromLazyTail2;
      case NotEmptyStateCode.TailCalculated:
        return this.state.tail;
      case NotEmptyStateCode.FullCalculated:
        return this.state.tail;
    }
  }
  concat(list: IList<T>): IList<T> {
    if (list.isEmpty()) {
      return this;
    }

    const collectedList = collect(list);
    let res: LazyList<T> = this;
    for (let i = collectedList.length - 1; i >= 0; i--) {
      const item = collectedList[i];
      const state: State<T> = {
        code: NotEmptyStateCode.FullCalculated,
        head: item,
        tail: res,
      };
      res = new LazyList(state);
    }
    return res;
  }
  prepend(item: T): IList<T> {
    return new LazyList({
      code: NotEmptyStateCode.FullCalculated,
      head: item,
      tail: this,
    });
  }

  map<U>(fn: (val: T) => U): IList<U> {
    const oldState = this.state;
    if (!oldState) return LazyList.empty as IList<U>;
    switch (oldState.code) {
      case NotEmptyStateCode.FullCalculated:
        return new LazyList({
          code: oldState.code,
          head: fn(oldState.head),
          tail: oldState.tail.map(fn),
        });
      case NotEmptyStateCode.FullLazy:
        return new LazyList({
          code: oldState.code,
          head: () => fn(oldState.head()),
          tail: () => oldState.tail().map(fn),
        });
      case NotEmptyStateCode.TailCalculated:
        return new LazyList({
          code: oldState.code,
          head: () => fn(oldState.head()),
          tail: oldState.tail.map(fn),
        });
      case NotEmptyStateCode.HeadCalculated:
        return new LazyList({
          code: oldState.code,
          head: fn(oldState.head),
          tail: () => oldState.tail().map(fn),
        });
    }
  }

  *[Symbol.iterator]() {
    let lst: IList<T> = this;
    while (!lst.isEmpty()) {
      let el = lst.head();
      yield el;
      lst = lst.tail();
    }
  }
}
