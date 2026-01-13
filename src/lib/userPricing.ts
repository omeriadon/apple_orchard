import { useCallback, useEffect, useState } from "react";

export type UserPricingOverride = {
	currency: string;
	multiplier: number;
};

const STORAGE_KEY = "apple-orchard-pricing-override";

function parseStoredValue(value: string | null): UserPricingOverride | null {
	if (!value) return null;
	try {
		const parsed = JSON.parse(value);
		if (typeof parsed !== "object" || parsed === null) return null;
		const { currency, multiplier } = parsed as Partial<UserPricingOverride>;
		if (
			!currency ||
			typeof currency !== "string" ||
			!multiplier ||
			typeof multiplier !== "number" ||
			!Number.isFinite(multiplier)
		) {
			return null;
		}
		return {
			currency: currency.toUpperCase(),
			multiplier,
		};
	} catch {
		return null;
	}
}

export function readUserPricingOverride(): UserPricingOverride | null {
	if (typeof window === "undefined") return null;
	return parseStoredValue(window.localStorage.getItem(STORAGE_KEY));
}

export function writeUserPricingOverride(value: UserPricingOverride | null) {
	if (typeof window === "undefined") return;
	if (!value) {
		window.localStorage.removeItem(STORAGE_KEY);
		return;
	}
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function useUserPricingOverride() {
	const [override, setOverrideState] = useState<UserPricingOverride | null>(
		null,
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setOverrideState(readUserPricingOverride());
		}, 0);
		const handleStorage = (event: StorageEvent) => {
			if (event.key === STORAGE_KEY) {
				setOverrideState(readUserPricingOverride());
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("storage", handleStorage);
		};
	}, []);

	const setOverride = useCallback((next: UserPricingOverride | null) => {
		writeUserPricingOverride(next);
		setOverrideState(next);
	}, []);

	return { override, setOverride } as const;
}
