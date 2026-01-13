import React, { useRef, useState } from "react";
import styles from "./deviceCard.module.css";
import { Device } from "@/types/device";
import { CalendarPlus, CalendarMinus, Pin } from "lucide-react";
import {
	DeviceCardRow,
	type DeviceCardRowProps,
} from "../DeviceCardRow/DeviceCardRow";

type Props = {
	device: Device;
	infoRows?: DeviceCardRowProps[];
	onClose?: () => void;
	open: boolean;
	onPromote?: () => void;
	zIndex?: number;
	variant?: "floating" | "pinned";
	onPin?: () => void;
};

export default function DeviceCard({
	device,
	infoRows = [],
	onClose,
	open,
	onPromote,
	zIndex,
	variant = "floating",
	onPin,
}: Props) {
	const ref = useRef<HTMLElement | null>(null);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const offset = useRef({ x: 0, y: 0 });
	const dragging = useRef(false);
	const isFloating = variant !== "pinned";
	const enableDrag = open && !isFloating;

	const onPointerDown = (e: React.PointerEvent) => {
		if (!open) return;

		onPromote?.();

		dragging.current = true;
		ref.current?.setPointerCapture(e.pointerId);

		offset.current = {
			x: e.clientX - pos.x,
			y: e.clientY - pos.y,
		};
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!dragging.current) return;

		setPos({
			x: e.clientX - offset.current.x,
			y: e.clientY - offset.current.y,
		});
	};

	const onPointerUp = (e: React.PointerEvent) => {
		dragging.current = false;
		ref.current?.releasePointerCapture(e.pointerId);
	};

	const className = [
		styles.card,
		isFloating ? styles.floating : styles.pinned,
		open ? styles.open : "",
	]
		.filter(Boolean)
		.join(" ");

	const pointerHandlers = enableDrag
		? {
				onPointerDown,
				onPointerMove,
				onPointerUp,
			}
		: {};

	return (
		<article
			ref={ref}
			className={className}
			aria-labelledby={`device-${device.id}`}
			{...pointerHandlers}
			style={{
				transform: `${
					isFloating
						? `translate(-50%, 0) translate(${pos.x}px, ${pos.y}px)`
						: `translate(${pos.x}px, ${pos.y}px)`
				} scale(${open ? 1 : 0.95})`,
				touchAction: enableDrag ? "none" : "auto",
				cursor: enableDrag ? "grab" : "default",
				zIndex: variant === "pinned" ? (zIndex ?? 20) : (zIndex ?? 20),
			}}
		>
			<header className={styles.header}>
				<div className={styles.flex}>
					<h2 id={`device-${device.id}`}>{device.name}</h2>

					<div className={styles.controls}>
						{isFloating && onPin && (
							<button
								type="button"
								className={styles.close}
								onPointerDown={(e) => e.stopPropagation()}
								onClick={() => onPin?.()}
								aria-label={`Pin ${device.name}`}
							>
								<Pin size={16} />
							</button>
						)}

						{onClose && (
							<button
								type="button"
								className={styles.close}
								onPointerDown={(e) => e.stopPropagation()}
								onClick={onClose}
							>
								✕
							</button>
						)}
					</div>
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
