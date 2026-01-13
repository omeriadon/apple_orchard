type NavigatorWithLanguages = Navigator & {
	languages?: string[];
};

export function detectRegion(): string {
	if (typeof navigator === "undefined") return "AU";

	const nav = navigator as NavigatorWithLanguages;
	const preferredLanguage = Array.isArray(nav.languages)
		? nav.languages[0]
		: undefined;
	const rawLocale = preferredLanguage ?? nav.language ?? "en-AU";
	const locale = String(rawLocale).replace(/_/g, "-");

	let region: string | undefined;
	if (typeof Intl !== "undefined" && typeof Intl.Locale === "function") {
		try {
			region = new Intl.Locale(locale).region;
		} catch {
			// ignore invalid locale strings
		}
	}

	if (!region) {
		const match = locale.match(/-([A-Za-z]{2})(?:$|[-_])/);
		if (match) {
			region = match[1];
		}
	}

	if (!region) {
		for (const token of locale.split("-")) {
			if (/^[A-Za-z]{2}$/.test(token)) {
				region = token;
				break;
			}
		}
	}

	if (!region) {
		if (/au/i.test(locale)) region = "AU";
		else if (/us/i.test(locale)) region = "US";
		else if (/(gb|uk)/i.test(locale)) region = "GB";
	}

	// Timezone heuristic: if user's timezone indicates Australia prefer AU
	try {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (!region && tz && /Australia\//i.test(tz)) return "AU";
	} catch {
		// ignore
	}

	if (!region) return "AU";

	region = region.toUpperCase();
	if (region === "UK") region = "GB";

	const EU = new Set([
		"AT",
		"BE",
		"BG",
		"HR",
		"CY",
		"CZ",
		"DK",
		"EE",
		"FI",
		"FR",
		"DE",
		"GR",
		"HU",
		"IE",
		"IT",
		"LV",
		"LT",
		"LU",
		"MT",
		"NL",
		"PL",
		"PT",
		"RO",
		"SK",
		"SI",
		"ES",
		"SE",
	]);
	if (EU.has(region)) return "EU";

	return region;
}
