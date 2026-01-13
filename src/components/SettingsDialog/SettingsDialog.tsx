"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./settingsDialog.module.css";
import { useUserPricingOverride } from "@/lib/userPricing";

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function SettingsDialog({ open, onClose }: Props) {
	const { override, setOverride } = useUserPricingOverride();
	const [currency, setCurrency] = useState("");
	const [multiplier, setMultiplier] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (!open) return;
		const timer = setTimeout(() => {
			setCurrency(override?.currency ?? "");
			setMultiplier(override ? String(override.multiplier) : "");
			setError("");
		}, 0);
		return () => clearTimeout(timer);
	}, [open, override]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const normalizedCurrency = currency.trim().toUpperCase();
		const parsed = Number(multiplier);
		if (!normalizedCurrency) {
			setError("Currency code is required.");
			return;
		}
		if (!/^[A-Z]{3}$/.test(normalizedCurrency)) {
			setError("Use a three-letter currency code like USD or EUR.");
			return;
		}
		if (!Number.isFinite(parsed) || parsed <= 0) {
			setError("Multiplier must be a number greater than zero.");
			return;
		}

		setOverride({ currency: normalizedCurrency, multiplier: parsed });
		onClose();
	};

	const handleReset = () => {
		setOverride(null);
		onClose();
	};

	if (!open) return null;

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div
				className={styles.dialog}
				role="dialog"
				aria-modal="true"
				onClick={(event) => event.stopPropagation()}
			>
				<div className={styles.headerRow}>
					<h3 className={styles.title}>Currency settings</h3>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Close settings"
					>
						×
					</button>
				</div>
				<p className={styles.description}>
					Tell us how much 1 AUD equals in your currency so the
					timeline reflects the prices you expect.
				</p>
				{override && (
					<p className={styles.helper}>
						Current override: 1 AUD = {override.multiplier}{" "}
						{override.currency}
					</p>
				)}
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label className={styles.label} htmlFor="currency-code">
							Currency code
						</label>
						<input
							id="currency-code"
							className={styles.input}
							value={currency}
							onChange={(event) =>
								setCurrency(event.target.value)
							}
							maxLength={3}
							placeholder="USD"
							autoComplete="off"
						/>
						<span className={styles.helper}>
							Example: 1 AUD = 0.67 USD
						</span>
					</div>
					<div className={styles.field}>
						<label
							className={styles.label}
							htmlFor="currency-multiplier"
						>
							Multiplier
						</label>
						<input
							id="currency-multiplier"
							className={styles.input}
							type="number"
							min="0"
							step="0.01"
							inputMode="decimal"
							value={multiplier}
							onChange={(event) =>
								setMultiplier(event.target.value)
							}
							placeholder="0.67"
						/>
						<span className={styles.helper}>
							Multiply the Australian dollar price by this number.
						</span>
					</div>
					<div className={styles.actions}>
						<button
							type="button"
							className={styles.secondary}
							onClick={handleReset}
						>
							Clear override
						</button>
						<button type="submit" className={styles.primary}>
							Save
						</button>
					</div>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
}
