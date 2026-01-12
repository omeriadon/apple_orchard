"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MarkerOrPreview.module.css";

type Props = {
	id: string;
	familyID: string;
};

export default function MarkerOrPreview({ id, familyID }: Props) {
	const url = `/images/iphones/${familyID}/${id}.png`;

	const [failed, setFailed] = useState(false);

	useEffect(() => {
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
				src={url}
				alt={id}
				fill
				sizes="120x150"
				className={styles.previewImg}
				onError={() => setFailed(true)}
			/>
		</div>
	);
}
