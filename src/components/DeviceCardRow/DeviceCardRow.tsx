import React from "react";
import type { LucideIcon } from "lucide-react";
import styles from "./deviceCardRow.module.css";

export const DEVICE_CARD_ICON_SIZE = 15;

export type DeviceCardRowProps = {
	icon?: LucideIcon;
	title: string;
	value: React.ReactNode;
};

export function DeviceCardRow({
	icon: Icon,
	title,
	value,
}: DeviceCardRowProps) {
	return (
		<div className={styles.infoRow}>
			{Icon ? (
				<span className={styles.infoIcon}>
					<Icon size={DEVICE_CARD_ICON_SIZE} />
				</span>
			) : (
				<span className={styles.infoIcon} />
			)}
			<span className={styles.infoTitle}>{title}</span>
			<span className={styles.infoValue}>{value}</span>
		</div>
	);
}
