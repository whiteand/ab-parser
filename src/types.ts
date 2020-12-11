export type P<T> = (text: string) => Iterator<Entry<T>>;

export type Entry<T> = { value: T; rest: string };
export type PS<T> = (text: string) => Iterator<Entry<T>>;
