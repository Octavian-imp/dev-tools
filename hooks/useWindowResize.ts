import { useEffect, useState } from "react";

export default function useWindowResize() {
  const [windowSize, setWindowSize] = useState<{ height: number, width: number }>({ height: 0, width: 0 })

  const handleWindowResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize)
    handleWindowResize()
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, []);

  return windowSize
}