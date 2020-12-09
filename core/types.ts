export type Entry<T> = [T, string];

export interface IGet<A> {
  readonly type: "get";
  (char: string): P<A>;
}

export interface ILook<A> {
  readonly type: "look";
  (str: string): P<A>;
}

export interface IFail {
  readonly type: "fail";
}

export interface IResult<A> {
  readonly type: "result";
  readonly current: A;
  readonly next: P<A>;
}

export interface IFinal<A> {
  readonly type: "final";
  readonly iterable: Iterable<Entry<A>>;
}

export type P<A> = IGet<A> | ILook<A> | IFail | IResult<A> | IFinal<A>;

export type ReadS<T> = (input: string) => Iterable<Entry<T>>;

export type ReadP<A = any, B = any> = (next: (val: A) => P<B>) => P<B>;
