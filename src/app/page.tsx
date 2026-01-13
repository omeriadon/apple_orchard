"use client";
import styles from "./home.module.css";
import { useState } from "react";
import { navItems } from "@/data/pages";
import Link from "next/link";

export default function Home() {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h1 className={styles.title}>The Apple Orchard</h1>
				<h2 className={styles.subtitle}>
					A tool to easily compare Apple devices on their main specs,
					to help with your next buy.
				</h2>
				<br />
				<p>
					Scroll through a section and compare the main specs of a
					device, such as base storage or refresh rate.
				</p>
			</div>
			<div className={styles.linksTitle}>Let&apos;s go:</div>
			<div className={styles.links}>
				{navItems.map((page, index) => (
					<Link
						href={page.path}
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
					</Link>
				))}
			</div>
		</div>
	);
}
