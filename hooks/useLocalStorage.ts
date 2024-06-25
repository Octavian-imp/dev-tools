"use client"
import { SetStateAction, useEffect, useState } from "react"

import { useEvent } from "./useEvent"

/**
 * @param key - ключ
 * @param initialValue - начальное значение (необязательно)
 * @description хук для получения значений из localStorage
 */
export const useLocalStorage = <Value>(
	key: string,
	initialValue?: Value,
) => {
	const [value, setValue] = useState<Value | null>(null)
	useEffect(() => {
		const storeValue = JSON.parse(localStorage.getItem(key) || "null")
		setValue(storeValue)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (
			typeof initialValue !== "undefined" &&
			localStorage.getItem(key) === null
		) {
			localStorage.setItem(key, JSON.stringify(initialValue))
			setValue(initialValue)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const setState = useEvent((newValue: SetStateAction<Value | null>) => {
		const currValue = newValue
		localStorage.setItem(key, JSON.stringify(currValue))
		setValue(currValue)
	})

	return [value, setState] as const
}
