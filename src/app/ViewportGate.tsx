"use client";

import { useEffect, useState } from "react";

export default function ViewportGate({
	children,
}: {
	children: React.ReactNode;
}) {
	const [blocked, setBlocked] = useState(false);

	useEffect(() => {
		const check = () =>
			setBlocked(window.innerWidth < 600 || window.innerHeight < 600);

		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return (
		<>
			<div
				style={{
					position: "fixed",
					inset: 0,
					background: "black",
					color: "white",
					display: "grid",
					placeItems: "center",
					opacity: blocked ? 1 : 0,
					pointerEvents: blocked ? "auto" : "none",
					transition: "opacity 300ms ease",
					zIndex: 9999,
				}}
			>
				<div>
					<p>Cannot view website, screen size is too small.</p>
					<p>A large screen is required to view this website.</p>
					<p>You can zoom out (⌃- or ⌘-) to view.</p>
				</div>
			</div>

			<div
				style={{
					opacity: blocked ? 0 : 1,
					transition: "opacity 300ms ease",
				}}
			>
				{children}
			</div>
		</>
	);
}
