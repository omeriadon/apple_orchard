"use client";

import { useEffect, useState } from "react";
import { computeBasePrice } from "@/lib/pricing";
import { useUserPricingOverride } from "@/lib/userPricing";
import type { Pricing } from "@/types/iphone";
import styles from "@/components/DeviceCard/deviceCard.module.css";

type Props = {
	pricing?: Pricing;
	storage?: number;
};

const PLACEHOLDER = "~ $—";

export default function RegionalPrice({ pricing, storage }: Props) {
	const { override } = useUserPricingOverride();
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setHydrated(true), 0);
		return () => clearTimeout(timer);
	}, []);

	if (!hydrated || !pricing) {
		return (
			<span className={`${styles.meta2} ${styles.price}`}>
				{PLACEHOLDER}
			</span>
		);
	}

	const base = computeBasePrice(pricing, storage);
	if (!base) {
		return (
			<span className={`${styles.meta2} ${styles.price}`}>
				{PLACEHOLDER}
			</span>
		);
	}

	const converted = Math.round(base.amount * override.multiplier);
	const formatted = new Intl.NumberFormat(undefined, {
		maximumFractionDigits: 0,
	}).format(converted);

	return (
		<span className={`${styles.meta2} ${styles.price}`}>
			~ ${formatted}
		</span>
	);
}
