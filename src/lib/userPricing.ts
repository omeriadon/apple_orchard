import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export type UserPricingOverride = {
	multiplier: number;
	explicit: boolean;
};

type StoredOverride = {
	multiplier: number;
	explicit?: boolean;
};

const STORAGE_KEY = "apple-orchard-pricing-override";
const DEFAULT_OVERRIDE: UserPricingOverride = {
	multiplier: 1,
	explicit: false,
};

let currentOverride: UserPricingOverride = DEFAULT_OVERRIDE;
const subscribers = new Set<() => void>();

const notifySubscribers = () => {
	for (const callback of subscribers) {
		callback();
	}
};

const normalizeStoredOverride = (
	override: StoredOverride,
): UserPricingOverride => ({
	multiplier: override.multiplier,
	explicit: typeof override.explicit === "boolean" ? override.explicit : true,
});

const applyOverride = (next: UserPricingOverride) => {
	if (
		next.multiplier === currentOverride.multiplier &&
		next.explicit === currentOverride.explicit
	) {
		return;
	}

	currentOverride = next;
	notifySubscribers();
};

const parseStoredValue = (value: string | null): UserPricingOverride | null => {
	if (!value) return null;
	try {
		const parsed = JSON.parse(value) as StoredOverride;
		if (typeof parsed?.multiplier !== "number" || parsed.multiplier <= 0)
			return null;
		return normalizeStoredOverride(parsed);
	} catch {
		return null;
	}
};

const readStoredOverride = (): UserPricingOverride | null => {
	if (typeof window === "undefined") return null;
	return parseStoredValue(localStorage.getItem(STORAGE_KEY));
};

const persistOverride = (override: UserPricingOverride) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(override));
	}
	applyOverride(override);
};

export function useUserPricingOverride() {
	const [hydrated, setHydrated] = useState(false);
	const override = useSyncExternalStore(
		(callback) => {
			subscribers.add(callback);
			return () => subscribers.delete(callback);
		},
		() => currentOverride,
		() => DEFAULT_OVERRIDE,
	);

	useEffect(() => {
		const stored = readStoredOverride();
		if (stored) {
			applyOverride(stored);
		}
		// Delay setHydrated to avoid synchronous state update in effect
		const timer = setTimeout(() => setHydrated(true), 0);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorage = (event: StorageEvent) => {
			if (event.key !== STORAGE_KEY) return;
			const next = parseStoredValue(event.newValue);
			applyOverride(next ?? DEFAULT_OVERRIDE);
		};

		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const setOverride = useCallback(
		(next: { multiplier: number; explicit?: boolean }) => {
			const normalized: UserPricingOverride = {
				multiplier: next.multiplier,
				explicit:
					typeof next.explicit === "boolean" ? next.explicit : true,
			};
			persistOverride(normalized);
		},
		[],
	);

	const resetOverride = useCallback(() => {
		persistOverride(DEFAULT_OVERRIDE);
	}, []);

	return { override, setOverride, resetOverride, hydrated } as const;
}
