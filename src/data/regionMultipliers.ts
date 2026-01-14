import type { Pricing } from "@/types/iphone";

export default function computeRegionalPrice(
	pricing: Pricing | undefined,
	storage?: number,
) {
	if (!pricing?.base) return null;

	const baseAmount = storage
		? (pricing.base.storage?.[storage] ?? pricing.base.new)
		: pricing.base.new;

	return { amount: baseAmount, currency: "AUD" };
}
