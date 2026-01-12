"use client";
import styles from "./home.module.css";
import { useState } from "react";
import { navItems } from "@/data/pages";

export default function Home() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	const filteredNavItems = navItems.filter(
		(page) => page.path !== "/" && page.path !== "/about"
	);

	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h1 className={styles.title}>The Apple Orchard</h1>
				<h2 className={styles.subtitle}>
					A tool to easily compare Apple devices on their main specs,
					to help with your next buy.
				</h2>
			</div>
			<div className={styles.linksTitle}>Pages:</div>
			<div className={styles.links}>
				{filteredNavItems.map((page, index) => (
					<div
						key={`${page.path}-${index}`}
						className={styles.link}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
						style={{
							backgroundColor:
								hoverIndex === index
									? page.hoverColor
									: "transparent",
						}}
					>
						{page.label}
					</div>
				))}
			</div>
		</div>
	);
}
