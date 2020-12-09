type Entry<T> = [T, string];

interface IGet<A> {
  readonly type: "get";
  readonly get: (char: string) => P<A>;
}

interface ILook<A> {
  readonly type: "look";
  readonly look: (str: string) => P<A>;
}

interface IFail {
  readonly type: "fail";
}

interface IResult<A> {
  readonly type: "result";
  readonly current: A;
  readonly next: P<A>;
}

interface IFinal<A> {
  readonly type: "final";
  readonly iterator: Iterator<Entry<A>>;
}

export type P<A> = IGet<A> | ILook<A> | IFail | IResult<A> | IFinal<A>;
