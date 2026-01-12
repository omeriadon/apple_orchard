"use client";
import { useState } from "react";
import IphoneCard from "../../components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";
import Image from "next/image";

type MarkerOrPreviewProps = {
	id: string;
	image?: string;
};

function MarkerOrPreview({ id, image }: MarkerOrPreviewProps) {
	if (image) {
		return (
			<div className={styles.markerBox}>
				<Image
					src={image}
					alt={id}
					width={120}
					height={150}
					className={styles.previewImg}
				/>
			</div>
		);
	}

	return (
		<div className={styles.markerBox}>
			<div className={styles.marker} />
		</div>
	);
}

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage useTimeline>
			{iPhones.map((device) => (
				<div
					className={styles.item}
					key={device.id}
					role="listitem"
				>
					<button
						type="button"
						className={styles.itemButton}
						aria-expanded={openId === device.id}
						aria-controls={`popup-${device.id}`}
						onClick={() =>
							setOpenId(openId === device.id ? null : device.id)
						}
						aria-label={`Toggle ${device.name}`}
					>
						<MarkerOrPreview id={device.id} image={device.image} />
						<span className={styles.label}>
							{device.name}
						</span>
					</button>

					<div
						id={`popup-${device.id}`}
						className={
							openId === device.id
								? `${styles.popup} ${styles.open}`
								: styles.popup
						}
						role="dialog"
						aria-hidden={openId !== device.id}
					>
						<IphoneCard
							device={device}
							onClose={() => setOpenId(null)}
						/>
					</div>
				</div>
			))}
		</DevicePage>
	);
}
