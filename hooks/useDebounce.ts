import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 750) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay]);

  return debouncedVal
}