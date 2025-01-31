import { isObject } from "./isObject"

export function deepMergeObject(target: any, ...sources: any[]): any {
	if (!sources.length) return target

	const source = sources.shift()
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) {
					Object.assign(target, { [key]: {} })
				}
				deepMergeObject(target[key], source[key])
			} else {
				Object.assign(target, { [key]: source[key] })
			}
		}
	}
	return deepMergeObject(target, ...sources)
}
