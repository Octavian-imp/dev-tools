import { useEffect, useState } from "react";

export default function useMouse() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const onMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }

  }, []);

  return mousePosition
}