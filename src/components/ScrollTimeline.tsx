import React from "react";
import styles from "./scroll-timeline.module.css";

type Props = {
	children: React.ReactNode;
};

export default function ScrollTimeline({ children }: Props) {
	return <div role="list">{children}</div>;
}
