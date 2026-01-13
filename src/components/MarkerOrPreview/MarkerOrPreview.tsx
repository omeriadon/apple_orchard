"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./MarkerOrPreview.module.css";

type Props = {
	id: string;
	familyID: string;
	deviceType: string;
	width: number;
	height: number;
};

export default function MarkerOrPreview({
	id,
	familyID,
	deviceType,
	width,
	height,
}: Props) {
	const url = useMemo(
		() => `/images/${deviceType}/${familyID}/${id}.png`,
		[id, familyID, deviceType],
	);
	const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set());
	const failed = failedUrls.has(url);

	if (failed) {
		return (
			<div className={styles.markerBox}>
				<div className={styles.marker} />
			</div>
		);
	}

	return (
		<div className={styles.markerBox}>
			<div
				className={styles.previewImg}
				style={{
					backgroundImage: `url(${url})`,
					backgroundSize: "300px 330px",
					width: "300px",
					height: "330px",
					backgroundRepeat: "no-repeat",
					display: "inline-block",
				}}
			/>
		</div>
	);
}
