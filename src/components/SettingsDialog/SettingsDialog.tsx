"use client";

import { FormEvent, useState } from "react";
import styles from "./settingsDialog.module.css";
import { useUserPricingOverride } from "@/lib/userPricing";

type Props = {
	open: boolean;
	onClose: () => void;
	required?: boolean;
};

export default function SettingsDialog({
	open,
	onClose,
	required = false,
}: Props) {
	const { override, setOverride } = useUserPricingOverride();
	const [multiplier, setMultiplier] = useState(String(override.multiplier));
	const [error, setError] = useState("");

	if (!open) return null;

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const parsed = Number(multiplier);
		if (!Number.isFinite(parsed) || parsed <= 0) {
			setError("Multiplier must be a number greater than zero.");
			return;
		}
		setOverride({ multiplier: parsed });
		onClose();
	};

	return (
		<div
			className={styles.backdrop}
			onClick={required ? undefined : onClose}
		>
			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<div className={styles.headerRow}>
					<h3 className={styles.title}>Currency Settings</h3>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label className={styles.label}>Price Multiplier</label>
						<input
							className={styles.input}
							type="number"
							min="0"
							step="0.01"
							value={multiplier}
							onChange={(e) => setMultiplier(e.target.value)}
						/>
					</div>
					<div className={styles.actions}>
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
