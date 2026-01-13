export const regionMultipliers: Record<
	string,
	{ multiplier: number; currency?: string }
> = {
	AU: { multiplier: 1, currency: "AUD" },
	US: { multiplier: 0.67, currency: "USD" },
	GB: { multiplier: 0.5, currency: "GBP" },
	EU: { multiplier: 0.58, currency: "EUR" },
	CA: { multiplier: 0.93, currency: "CAD" },
	NZ: { multiplier: 1.16, currency: "NZD" },
	JP: { multiplier: 107, currency: "JPY" },
	CN: { multiplier: 4.68, currency: "CNY" },
	IN: { multiplier: 60, currency: "INR" },
	HK: { multiplier: 5.24, currency: "HKD" },
	SG: { multiplier: 0.86, currency: "SGD" },
	CH: { multiplier: 0.54, currency: "CHF" },
};
