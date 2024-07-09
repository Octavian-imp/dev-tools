import { useEvent } from './useEvent';
import { SetStateAction, useEffect, useState } from "react";
"use client"


/**
 * @param key - ключ
 * @param initialValue - начальное значение (в случае если указано, значение также будет записано в localStorage)
 * @description хук для получения значений из localStorage
 */
export const useLocalStorage = <Value>(key: string, initialValue?: Value) => {
	const getStoreValue = (key: string) => {
		if (typeof window !== "undefined") {
			return localStorage.getItem(key)
		}
		return null
	}

	const [value, setValue] = useState<Value | null>(() => {
		try {
			const value = getStoreValue(key)
			if (value !== null) {
				return JSON.parse(value)
			} else {
				return initialValue || null
			}
		} catch (error) {
			console.log(error)
		}
	})

	useEffect(() => {
		try {
			if (typeof initialValue !== "undefined" && getStoreValue(key) === null) {
				localStorage.setItem(key, JSON.stringify(initialValue))
				setValue(initialValue)
			}
		} catch (error) {
			console.error(error)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const setState = useEvent((newValue: SetStateAction<Value | null>) => {
		try {
			if (typeof window !== "undefined") {
				const currValue = newValue
				localStorage.setItem(key, JSON.stringify(currValue))
				setValue(currValue)
			}
		} catch (error) {
			console.error(error)
		}
	})

	return [value, setState] as const
}
