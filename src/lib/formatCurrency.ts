export function formatCurrency(amount: number, currency: string) {
	const a = Math.round(amount);
	try {
		return new Intl.NumberFormat(undefined, {
			style: "currency",
			currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(a);
	} catch {
		return `${currency} ${a.toLocaleString()}`;
	}
}
