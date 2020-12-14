export declare type P<T> = (text: string) => Iterator<Entry<T>>;
export declare type Entry<T> = {
    readonly value: T;
    readonly rest: string;
};
export declare type PS<T> = (text: string) => Iterator<Entry<T>>;
