import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { NAV_ITEMS } from "../data/pages";

export default function Navbar() {
	const pathname = usePathname();
	const left = NAV_ITEMS.filter((i) => i.slot === "left");
	const center = NAV_ITEMS.filter((i) => i.slot === "center");
	const right = NAV_ITEMS.filter((i) => i.slot === "right");

	return (
		<nav className={styles.navbar}>
			<div className={styles.left}>
				{left.map((item) => {
					const isActive = item.path === pathname;
					return (
						<Link
							key={item.path}
							href={item.path}
							className={`${styles.title} ${
								isActive ? styles.active : ""
							}`}
							aria-current={isActive ? "page" : undefined}
							style={
								{
									"--hover-color": item.hoverColor,
								} as React.CSSProperties
							}
						>
							{item.label}
						</Link>
					);
				})}
			</div>

			<div className={styles.center}>
				<div className={styles["navbar-links"]}>
					{center.map((item) => {
						const isActive = item.path === pathname;
						return (
							<Link
								key={item.path}
								href={item.path}
								className={`${styles.link} ${
									isActive ? styles.active : ""
								}`}
								aria-current={isActive ? "page" : undefined}
								style={
									{
										"--hover-color": item.hoverColor,
									} as React.CSSProperties
								}
							>
								{item.label}
							</Link>
						);
					})}
				</div>
			</div>

			<div className={styles.right}>
				{right.map((item) => {
					const isActive = item.path === pathname;
					return (
						<Link
							key={item.path}
							href={item.path}
							className={`${styles.link} ${
								isActive ? styles.active : ""
							}`}
							aria-current={isActive ? "page" : undefined}
							style={
								{
									"--hover-color": item.hoverColor,
								} as React.CSSProperties
							}
						>
							{item.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
