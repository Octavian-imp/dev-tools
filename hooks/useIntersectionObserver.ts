import { RefObject, useEffect, useMemo, useState } from "react"

export function useIntersectionObserver(
	elRef: RefObject<HTMLElement>,
	options?: IntersectionObserverInit,
) {
	const [isIntersecting, setIntersecting] = useState(false)

	const observer = useMemo(
		() => {
			return new IntersectionObserver(
				([entry]) => setIntersecting(entry.isIntersecting),
				options,
			)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[elRef],
	)

	useEffect(() => {
		if (elRef.current) {
			observer.observe(elRef.current)
		}

		return () => {
			observer.disconnect()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return isIntersecting
}
