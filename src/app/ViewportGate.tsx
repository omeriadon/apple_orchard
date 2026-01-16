"use client";
import { useEffect, useState } from "react";

export default function ViewportGate({
	children,
}: {
	children: React.ReactNode;
}) {
	const [blocked, setBlocked] = useState(false);

	useEffect(() => {
		const check = () => {
			setBlocked(window.innerWidth < 1000 || window.innerHeight < 700);
		};

		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	if (blocked) {
		return (
			<div
				style={{
					height: "100vh",
					width: "100vw",
					display: "grid",
					placeItems: "center",
					background: "black",
					color: "white",
					textAlign: "center",
					fontSize: "1.5rem",
				}}
			>
				<div>
					<p>Cannot view website, screen size is too small.</p>
					<p>A large screen is required to view this website.</p>
					<p>You can zoom out (⌃- or ⌘-) to view.</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
