function isEmptyIterable(iter: Iterable<any>): boolean {
  for (const _el of iter) {
    return true;
  }
  return false;
}
