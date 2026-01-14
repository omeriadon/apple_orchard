"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { navItems } from "../../data/pages";
import Image from "next/image";
import SettingsDialog from "@/components/SettingsDialog/SettingsDialog";
import { useEffect, useState } from "react";
import { useUserPricingOverride } from "@/lib/userPricing";

export default function Navbar() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const center = navItems.filter((i) => i.slot === "center");
	const { override, hydrated } = useUserPricingOverride();

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (settingsOpen || !hydrated) return;

		if (!override.explicit) {
			setTimeout(() => setSettingsOpen(true), 0);
		}
	}, [override.explicit, settingsOpen, hydrated]);

	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.left}>
					<Link href="/" className={styles.title} key="/">
						<Image
							src="/apple.svg"
							alt="Apple Orchard Logo"
							width={27}
							height={27}
						/>
						<h1>Apple Orchard</h1>
					</Link>
				</div>

				<div className={styles.center}>
					<div className={styles["navbar-links"]}>
						{center.map((item) => (
							<Link
								key={item.path}
								href={item.path}
								className={styles.link}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>

				<div className={styles.right}>
					<button
						type="button"
						className={styles.settingsToggle}
						onClick={() => setSettingsOpen(true)}
					>
						Currency
					</button>
					<Link href="/about" className={styles.link} key="/about">
						About
					</Link>
				</div>
			</nav>

			<SettingsDialog
				key={`${settingsOpen}-${override.multiplier}-${override.explicit}`}
				open={settingsOpen}
				onClose={() => setSettingsOpen(false)}
				required={!override.explicit}
			/>
		</>
	);
}
