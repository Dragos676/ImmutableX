export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function validateString<T extends string>(
  val: string,
  validValues: readonly string[],
): T {
  const res = validValues.indexOf(val);
  if (res < 0) {
    throw Error(`${val} is not one of ${validValues}`);
  }
  return val as T;
}

export function deepCopy(object:any) {
  return JSON.parse(JSON.stringify(object));
}