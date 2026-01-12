import React from "react";
import styles from "./scroll-timeline.module.css";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function ScrollTimeline({ children, className = "" }: Props) {
	return (
		<div className={`${styles.timeline} ${className}`} role="list">
			{children}
		</div>
	);
}
