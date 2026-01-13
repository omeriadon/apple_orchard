"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./MarkerOrPreview.module.css";

type Props = {
	id: string;
	familyID: string;
	deviceType: string;
	size: string;
};

export default function MarkerOrPreview({
	id,
	familyID,
	deviceType,
	size,
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
			<div className={styles.previewWrapper}>
				<Image
					src={url}
					alt={id}
					fill
					unoptimized
					sizes={size}
					className={styles.previewImg}
					onError={() =>
						setFailedUrls((prev) => {
							if (prev.has(url)) return prev;
							const next = new Set(prev);
							next.add(url);
							return next;
						})
					}
				/>
			</div>
		</div>
	);
}
