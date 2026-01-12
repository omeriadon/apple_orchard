import React from "react";
import styles from "./device-page.module.css";

type Props = {
	children: React.ReactNode;
};

export default function DevicePage({ children }: Props) {
	return (
		<section className={styles.container}>
			<div className={styles.content}>{children}</div>
		</section>
	);
}
