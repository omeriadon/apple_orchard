"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./MarkerOrPreview.module.css";

type Props = {
	id: string;
	familyID: string;
};

export default function MarkerOrPreview({ id, familyID }: Props) {
	const url = `/images/iphones/${familyID}/${id}.png`;
	const renderKey = `${familyID}-${id}`;
	const [failedKey, setFailedKey] = useState<string | null>(null);
	const hasFailed = failedKey === renderKey;

	if (hasFailed) {
		return (
			<div className={styles.markerBox}>
				<div className={styles.marker} />
			</div>
		);
	}

	return (
		<div className={styles.markerBox}>
			<Image
				key={renderKey}
				src={url}
				alt={id}
				className={styles.previewImg}
				onError={() => setFailedKey(renderKey)}
				decoding="async"
				loading="lazy"
				fill
				sizes="120px"
			/>
		</div>
	);
}
