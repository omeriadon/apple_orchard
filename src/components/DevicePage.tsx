import React from "react";
import styles from "./devicePage.module.css";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

type Props = {
	children: React.ReactNode;
};

export default function DevicePage({ children }: Props) {
	return (
		<section className={styles.container}>
			<div className={styles.content}>{children}</div>
			<ProgressiveBlur
				className={`${styles.blurEdge} ${styles.blurLeft}`}
				direction="left"
				blurIntensity={1}
				blurLayers={3}
			/>
			<ProgressiveBlur
				className={`${styles.blurEdge} ${styles.blurRight}`}
				direction="right"
				blurIntensity={1}
				blurLayers={3}
			/>
		</section>
	);
}
