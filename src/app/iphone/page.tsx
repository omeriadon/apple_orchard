"use client";
import { useState, useEffect } from "react";
import IphoneCard from "../../components/iPhoneCard";
import { iPhones } from "@/data/iphones";
import styles from "./iphone.module.css";
import DevicePage from "@/components/DevicePage";
import Image from "next/image";
import ScrollTimeline from "@/components/ScrollTimeline";

function MarkerOrPreview({
	id,
	ariaExpanded,
	ariaControls,
	onClick,
	ariaLabel,
}: {
	id: string;
	ariaExpanded: boolean;
	ariaControls: string;
	onClick: () => void;
	ariaLabel: string;
}) {
	const [foundSrc, setFoundSrc] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		const exts = ["webp", "png", "jpg"];
		const variants = [id, id.toLowerCase(), id.replace(/\s+/g, "")];

		const tryLoad = (url: string) =>
			new Promise<string>((resolve, reject) => {
				const img = new window.Image();
				img.onload = () => resolve(url);
				img.onerror = () => reject(url);
				img.src = url;
			});

		(async () => {
			for (const v of variants) {
				for (const ext of exts) {
					const url = `/images/iphones/${v}.${ext}`;
					try {
						await tryLoad(url);
						if (!cancelled) {
							setFoundSrc(url);
							return;
						}
					} catch {
						/* try next */
					}
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [id]);

	if (foundSrc) {
		return (
			<div className={styles.markerBox}>
				<button
					type="button"
					className={styles.preview}
					aria-expanded={ariaExpanded}
					aria-controls={ariaControls}
					onClick={onClick}
					aria-label={ariaLabel}
				>
					<Image
						src={foundSrc}
						alt=""
						width={120}
						height={150}
						className={styles.previewImg}
					/>
				</button>
			</div>
		);
	}

	return (
		<div className={styles.markerBox}>
			<button
				type="button"
				className={styles.marker}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}
				onClick={onClick}
				aria-label={ariaLabel}
			/>
		</div>
	);
}

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage>
			<ScrollTimeline>
				{iPhones.map((device) => (
					<div
						className={styles.item}
						key={device.id}
						role="listitem"
					>
						<MarkerOrPreview
							id={device.id}
							ariaExpanded={openId === device.id}
							ariaControls={`popup-${device.id}`}
							onClick={() =>
								setOpenId(
									openId === device.id ? null : device.id
								)
							}
							ariaLabel={`Toggle ${device.name}`}
						/>
						<div className={styles.label}>{device.name}</div>

						<div
							id={`popup-${device.id}`}
							className={`${styles.popup} ${
								openId === device.id ? styles.open : ""
							}`}
							role="dialog"
							aria-hidden={openId !== device.id}
						>
							<div className={styles["card-wrapper"]}>
								<button
									type="button"
									className={styles.close}
									onClick={() => setOpenId(null)}
								>
									✕
								</button>
								<IphoneCard device={device} />
							</div>
						</div>
					</div>
				))}
			</ScrollTimeline>
		</DevicePage>
	);
}
