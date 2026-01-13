import type { Pricing } from "@/types/iphone";
import { regionMultipliers } from "@/data/regionMultipliers";

export function computeRegionalPrice(
	pricing: Pricing | undefined,
	region = "AU",
	storage?: number,
) {
	if (!pricing) return null;
	const base = pricing.base;
	if (!base) return null;

	const baseAmount = storage
		? (base.storage?.[storage] ?? base.new)
		: base.new;

	const deviceRegionInfo = pricing.regions?.[region];
	const globalRegionInfo = regionMultipliers[region];
	const regionInfo = deviceRegionInfo ??
		globalRegionInfo ?? { multiplier: 1, currency: base.baseCurrency };

	const amount = Math.round(baseAmount * regionInfo.multiplier);
	const currency = regionInfo.currency ?? base.baseCurrency;

	return { amount, currency };
}
