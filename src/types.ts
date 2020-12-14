export type P<T> = (text: string) => Iterator<Entry<T>>;

export type Entry<T> = { readonly value: T; readonly rest: string };
export type PS<T> = (text: string) => Iterator<Entry<T>>;
