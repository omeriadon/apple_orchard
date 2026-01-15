import styles from "./about.module.css";

export default function Page() {
	return (
		<div className={styles.about}>
			<h1 className={styles.title}>About</h1>
			<div className={styles.content}>
				<p>All prices are in AUD</p>
				<p>Made for Flavortown</p>
				<p>Made by Adon Omeri</p>
				<a
					href="https://dev.adonis.pt"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit my website
				</a>
			</div>
		</div>
	);
}
