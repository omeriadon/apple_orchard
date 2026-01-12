import React, { useRef, useState } from "react";
import styles from "./deviceCard.module.css";
import { Device } from "@/types/device";
import { CalendarPlus, CalendarMinus } from "lucide-react";
import {
	DeviceCardRow,
	type DeviceCardRowProps,
} from "../DeviceCardRow/DeviceCardRow";

type Props = {
	device: Device;
	infoRows?: DeviceCardRowProps[];
	onClose?: () => void;
	open: boolean;
};

export default function DeviceCard({
	device,
	infoRows = [],
	onClose,
	open,
}: Props) {
	const ref = useRef<HTMLElement | null>(null);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const offset = useRef({ x: 0, y: 0 });

	const onPointerDown = (e: React.PointerEvent) => {
		if (!open) return;
		ref.current?.setPointerCapture(e.pointerId);
		offset.current = {
			x: e.clientX - pos.x,
			y: e.clientY - pos.y,
		};
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!open) return;
		if (!ref.current?.hasPointerCapture(e.pointerId)) return;

		setPos({
			x: e.clientX - offset.current.x,
			y: e.clientY - offset.current.y,
		});
	};

	const onPointerUp = (e: React.PointerEvent) => {
		ref.current?.releasePointerCapture(e.pointerId);
	};

	return (
		<article
			ref={ref}
			className={`${styles.card} ${open ? styles.open : ""}`}
			aria-labelledby={`device-${device.id}`}
			onPointerDown={open ? onPointerDown : undefined}
			onPointerMove={open ? onPointerMove : undefined}
			onPointerUp={open ? onPointerUp : undefined}
			style={{
				transform: `translateX(-50%) scale(${
					open ? 1 : 0.95
				}) translate(${pos.x}px, ${pos.y}px)`,
				touchAction: "none",
				cursor: open ? "grab" : "default",
			}}
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

			<section className={styles.body}>
				<div className={styles.bodyGrid}>
					{infoRows.map((row, index) => (
						<DeviceCardRow key={`${row.title}-${index}`} {...row} />
					))}
				</div>
			</section>
		</article>
	);
}
