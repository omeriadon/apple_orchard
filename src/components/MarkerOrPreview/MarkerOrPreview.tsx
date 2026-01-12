"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MarkerOrPreview.module.css";

type Props = {
	id: string;
	familyID: string;
};

export default function MarkerOrPreview({ id, familyID }: Props) {
	const primary = `/images/iphones/${id}.png`;
	const lowercase = `/images/iphones/${id.toLowerCase()}.png`;
	const familyFallback = `/images/iphones/${familyID}/${id}.png`;

	const attempts = [primary, lowercase, familyFallback];
	const [attemptIndex, setAttemptIndex] = useState(0);
	const [failed, setFailed] = useState(false);

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
