"use client";

import { useEffect, useState } from "react";
import type { Pricing } from "@/types/iphone";
import { computeRegionalPrice } from "@/lib/pricing";
import { detectRegion } from "@/lib/region";
import { formatCurrency } from "@/lib/formatCurrency";
import { useUserPricingOverride } from "@/lib/userPricing";
import styles from "@/components/DeviceCard/deviceCard.module.css";

type Props = {
	pricing?: Pricing;
	storage?: number;
};

const PLACEHOLDER = "—";

export default function RegionalPrice({ pricing, storage }: Props) {
	const [isHydrated, setIsHydrated] = useState(false);
	const { override } = useUserPricingOverride();

	useEffect(() => {
		const timer = setTimeout(() => setIsHydrated(true), 0);
		return () => clearTimeout(timer);
	}, []);

	const displayText = (() => {
		if (!pricing) return "N/A";
		if (!isHydrated) return PLACEHOLDER;

		if (override) {
			const basePrice = computeRegionalPrice(pricing, "AU", storage);
			if (!basePrice) return "N/A";
			const convertedAmount = Math.round(
				basePrice.amount * override.multiplier,
			);
			const currency = override.currency ?? basePrice.currency;
			return formatCurrency(convertedAmount, currency);
		}

		const region = detectRegion();
		const price = computeRegionalPrice(pricing, region, storage);
		if (!price) return "N/A";

		return formatCurrency(price.amount, price.currency);
	})();

	return (
		<span className={`${styles.meta2} ${styles.price}`}>{displayText}</span>
	);
}
