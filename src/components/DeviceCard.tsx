import React from "react";
import styles from "./deviceCard.module.css";
import { Device } from "@/types/device";
import { CalendarPlus, CalendarMinus } from "lucide-react";

type Props = {
	device: Device;
	children?: React.ReactNode;
};

export default function DeviceCard({ device, children }: Props) {
	return (
		<article
			className={styles.card}
			aria-labelledby={`device-${device.id}`}
		>
			<header className={styles.header}>
				<h2 id={`device-${device.id}`}>{device.name}</h2>
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
