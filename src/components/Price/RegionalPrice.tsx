"use client";

import { useEffect, useState } from "react";
import type { Pricing } from "@/types/iphone";
import { computeRegionalPrice } from "@/lib/pricing";
import { detectRegion } from "@/lib/region";
import { useUserPricingOverride } from "@/lib/userPricing";
import { CircleDollarSign } from "lucide-react";
import styles from "@/components/DeviceCard/deviceCard.module.css";

type Props = {
	pricing?: Pricing;
	storage?: number;
};

const PLACEHOLDER = "—";

function formatNumber(amount: number) {
	return new Intl.NumberFormat(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(Math.round(amount));
}

export default function RegionalPrice({ pricing, storage }: Props) {
	const [isHydrated, setIsHydrated] = useState(false);
	const { override } = useUserPricingOverride();

	useEffect(() => {
		const timer = setTimeout(() => setIsHydrated(true), 0);
		return () => clearTimeout(timer);
	}, []);

	const displayText = (() => {
		if (!pricing) return "?";
		if (!isHydrated) return PLACEHOLDER;

		if (override) {
			const basePrice = computeRegionalPrice(pricing, "AU", storage);
			if (!basePrice) return "?";
			const convertedAmount = Math.round(
				basePrice.amount * override.multiplier,
			);
			return formatNumber(convertedAmount);
		}

		const region = detectRegion();
		const price = computeRegionalPrice(pricing, region, storage);
		if (!price) return "?";

		return formatNumber(price.amount);
	})();

	return (
		<span className={`${styles.meta2} ${styles.price}`}>
			<CircleDollarSign size={17} />
			{displayText}
		</span>
	);
}
