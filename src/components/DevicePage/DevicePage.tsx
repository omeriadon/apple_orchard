import React from "react";
import styles from "./devicePage.module.css";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

type ScrollTimelineProps = {
	children: React.ReactNode;
};

export function ScrollTimeline({ children }: ScrollTimelineProps) {
	return <div role="list">{children}</div>;
}

type Props = {
	children: React.ReactNode;
	useTimeline?: boolean;
	timelineClassName?: string;
};

export default function DevicePage({
	children,
	useTimeline = false,
	timelineClassName = "",
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
