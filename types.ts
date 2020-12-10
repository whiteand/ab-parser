import { IList } from "./list/types";

export type ReadS<T> = (str: string) => IList<{ head: T; rest: string }>;
