export async function copyToClipboard(text: string) {
	if ("clipboard" in navigator) {
		return await navigator.clipboard.writeText(text)
	}
	return null
}
