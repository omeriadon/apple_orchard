"use client";

import { FormEvent, useEffect, useState } from "react";
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

	const [visible, setVisible] = useState(false);
	const [animating, setAnimating] = useState(false); // true while animating
	const [blur, setBlur] = useState(0);

	// Handle dialog mount + enter animation
	useEffect(() => {
		if (open) {
			setVisible(true);
			setBlur(0); // start from 0
			setAnimating(true);

			// animate in on next frame
			const frame = requestAnimationFrame(() => setBlur(8));
			return () => cancelAnimationFrame(frame);
		} else if (visible) {
			// animate out
			setAnimating(true);
			setBlur(0);
			const timer = setTimeout(() => {
				setVisible(false);
				setAnimating(false);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [open]);

	// Esc handling
	useEffect(() => {
		if (!visible) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && !required) handleClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [visible, required]);

	const handleClose = () => {
		if (!visible || !animating) return;
		setBlur(0);
		setTimeout(() => onClose(), 200);
	};

	if (!visible) return null;

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const parsed = Number(multiplier);
		if (!Number.isFinite(parsed) || parsed <= 0) {
			setError("Multiplier must be a number greater than zero.");
			return;
		}
		setOverride({ multiplier: parsed });
		handleClose();
	};

	return (
		<div
			className={styles.backdrop}
			style={{
				backdropFilter: `blur(${blur}px)`,
				opacity: blur / 8,
				transition: "backdrop-filter 0.2s ease, opacity 0.2s ease",
			}}
			onClick={required ? undefined : handleClose}
		>
			<div
				className={styles.dialog}
				style={{
					transform: `scale(${0.9 + 0.1 * (blur / 8)})`,
					opacity: blur / 8,
					transition: "transform 0.2s ease, opacity 0.2s ease",
				}}
				onClick={(e) => e.stopPropagation()}
			>
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
