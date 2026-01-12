import Link from "next/link";
import styles from "./navbar.module.css";
import { navItems } from "../../data/pages";

export default function Navbar() {
	const center = navItems.filter((i) => i.slot === "center");

	return (
		<nav className={styles.navbar}>
			<div className={styles.left}>
				<Link href="/" className={styles.title} key="/">
					Apple Orchard
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
				<Link href="/about" className={styles.link} key="/about">
					About
				</Link>
			</div>
		</nav>
	);
}
