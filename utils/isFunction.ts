export default function isFunction<T>(value: T): boolean {
  return typeof value === "function" || value instanceof Function
}