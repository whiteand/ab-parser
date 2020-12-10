import { Entry } from "./entry";
import { IList } from "./list/types";

export type ReadS<T> = (str: string) => IList<Entry<T>>;
