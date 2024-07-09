/**
 *
 * @param value
 * @param locale [locale="ru-RU"] - Стандарт, который описывает локали – RFC 5646, языки описаны в IANA language registry.
 * @param currency [currency="RUB"] - В качестве значения принимает код валюты в формате ISO 4217, например, "USD" (доллар США), "EUR" (евро) и т.д.
 * @returns Возвращает значение value в виде строки с указанием валюты
 */
export function convertToCurrency(
	value: number,
	locale: string = "ru-RU",
	currency: string = "RUB",
	options?: Omit<
		Intl.NumberFormatOptions,
		"style" | "currency" | "useGrouping" | "maximumFractionDigits"
	>,
) {
	return Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
		useGrouping: true,
		maximumFractionDigits: 0,
		...options,
	}).format(value)
}
