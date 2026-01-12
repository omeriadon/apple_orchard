"use client";
import { useState, useEffect } from "react";
import IphoneCard from "../../components/device/iPhoneCard";
import { iPhones } from "@/data/iphones";
import DevicePage from "@/components/DevicePage/DevicePage";
import styles from "@/components/DevicePage/devicePage.module.css";
import Image from "next/image";

type MarkerOrPreviewProps = {
	id: string;
	familyID: string;
};

function MarkerOrPreview({ id, familyID }: MarkerOrPreviewProps) {
	const primary = `/images/iphones/${id}.png`;
	const lowercase = `/images/iphones/${id.toLowerCase()}.png`;
	const familyFallback = `/images/iphones/${familyID}/${id}.png`;

	const attempts = [primary, lowercase, familyFallback];
	const [attemptIndex, setAttemptIndex] = useState(0);
	const [failed, setFailed] = useState(false);

	// reset when id/family changes
	useEffect(() => {
		setAttemptIndex(0);
		setFailed(false);
	}, [id, familyID]);

	if (failed) {
		return (
			<div className={styles.markerBox}>
				<div className={styles.marker} />
			</div>
		);
	}

	return (
		<div className={styles.markerBox}>
			<Image
				src={attempts[attemptIndex]}
				alt={id}
				width={120}
				height={150}
				className={styles.previewImg}
				onError={() => {
					if (attemptIndex < attempts.length - 1)
						setAttemptIndex((i) => i + 1);
					else setFailed(true);
				}}
			/>
		</div>
	);
}

export default function Page() {
	const [openId, setOpenId] = useState<string | null>(null);

	return (
		<DevicePage useTimeline>
			{iPhones.map((device) => (
				<div className={styles.item} key={device.id} role="listitem">
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
						<MarkerOrPreview
							id={device.id}
							familyID={device.familyID}
						/>
						<span className={styles.label}>{device.name}</span>
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
