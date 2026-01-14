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
	const { override, setOverride, resetOverride } = useUserPricingOverride();
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

	const handleReset = () => {
		resetOverride();
		onClose();
	};

	return (
		<div
			className={styles.backdrop}
			onClick={required ? undefined : onClose}
		>
			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<div className={styles.headerRow}>
					<h3 className={styles.title}>Currency settings</h3>
					<button
						type="button"
						className={styles.closeButton}
						disabled={required}
						onClick={required ? undefined : onClose}
					>
						×
					</button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label className={styles.label}>Multiplier</label>
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
						<button
							type="button"
							className={styles.secondary}
							onClick={handleReset}
						>
							Reset to 1x
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
