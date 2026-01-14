import type { Pricing } from "@/types/iphone";

export type BasePrice = {
	amount: number;
	currency: string;
	refurbished?: number;
	storage?: Record<number, number>;
};

export function computeBasePrice(
	pricing: Pricing | undefined,
	storage?: number,
): BasePrice | null {
	if (!pricing?.base) return null;

	const base = pricing.base;
	const amount = storage ? (base.storage?.[storage] ?? base.new) : base.new;

	return {
		amount,
		currency: "AUD",
		refurbished: base.refurbished,
		storage: base.storage,
	};
}
