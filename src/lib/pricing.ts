import type { Pricing } from "@/types/iphone";

export function computeBasePrice(
	pricing: Pricing | undefined,
	storage?: number,
) {
	if (!pricing?.base) return null;

	const amount = storage
		? (pricing.base.storage?.[storage] ?? pricing.base.new)
		: pricing.base.new;
	return { amount, currency: "AUD" };
}
