export function randomString(length: number): string {
  const a = "A".charCodeAt(0);
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 26) + a);
  return String.fromCharCode(...arr);
}

export function arrToObj<T>(
  arr: T[],
  keyFn: (obj: T) => string
): { [key: string]: T } {
  return Object.fromEntries(arr.map((obj) => [keyFn(obj), obj]));
}