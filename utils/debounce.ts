export default function debounce<Fn extends (...args: any[]) => any>(fn: Fn, delay: number = 100) {
  let timeoutId: NodeJS.Timeout
  return function (this: ThisParameterType<Fn>, args: Parameters<Fn>) {
    const fnCall = () => fn.apply(this, args)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(fnCall, delay)
  }
}