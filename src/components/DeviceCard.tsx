import React from "react";
import styles from "./deviceCard.module.css";
import { Device } from "@/types/device";

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
					<span>Introduced: {device.introduced}</span>
					<span>Supported until: {device.supportedUntil}</span>
				</div>
			</header>

			<section className={styles.body}>{children}</section>
		</article>
	);
}
