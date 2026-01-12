import React from "react";
import styles from "./deviceCard.module.css";
import { Device } from "@/types/device";
import { CalendarPlus, CalendarMinus } from "lucide-react";

type Props = {
	device: Device;
	children?: React.ReactNode;
	onClose?: () => void;
};

export default function DeviceCard({ device, children, onClose }: Props) {
	return (
		<article
			className={styles.card}
			aria-labelledby={`device-${device.id}`}
		>
			<header className={styles.header}>
				<div className={styles.flex}>
					<h2 id={`device-${device.id}`}>{device.name}</h2>
					{onClose ? (
						<button
							type="button"
							className={styles.close}
							onClick={onClose}
						>
							✕
						</button>
					) : null}
				</div>
				<div className={styles.meta}>
					<span className={styles.meta2}>
						<CalendarPlus size={16} />
						{device.introduced}
					</span>
					<span className={styles.meta2}>
						<CalendarMinus size={16} />
						{device.supportedUntil}
					</span>
				</div>
			</header>

			<section className={styles.body}>{children}</section>
		</article>
	);
}
