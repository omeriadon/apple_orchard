import React from "react";
import styles from "./devicePage.module.css";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

type Props = {
	children: React.ReactNode;
	useTimeline?: boolean;
	timelineClassName?: string;
	footer?: React.ReactNode;
};

export default function DevicePage({
	children,
	useTimeline = false,
	timelineClassName = "",
 	footer,
}: Props) {
	return (
		<section className={styles.container}>
			<div className={styles.content}>
				{useTimeline ? (
					<div
						className={`${styles.timeline} ${timelineClassName}`.trim()}
						role="list"
					>
						{children}
					</div>
				) : (
					children
				)}
				{footer}
			</div>
			<ProgressiveBlur
				className={`${styles.blurEdge} ${styles.blurLeft}`}
				direction="left"
				blurIntensity={1}
				blurLayers={5}
			/>
			<ProgressiveBlur
				className={`${styles.blurEdge} ${styles.blurRight}`}
				direction="right"
				blurIntensity={1}
				blurLayers={5}
			/>
		</section>
	);
}
