import { get as constGet, IGet } from "../core";

export function get(): IGet<string> {
  return constGet();
}
