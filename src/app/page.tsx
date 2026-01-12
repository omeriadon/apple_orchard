const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

export default function Home() {
	return (
		<div>
			<main>stuff</main>
			{items.map((item) => (
				<div key={item} className="grid-item">
					{item}
				</div>
			))}
		</div>
	);
}
