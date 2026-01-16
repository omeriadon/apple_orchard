import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Background from "@/components/Background";
import { ViewTransition } from "react";
import ViewportGate from "./ViewportGate";

export const metadata: Metadata = {
	title: "Apple Orchard",
	description: "An intuitive interactive timeline of Apple devices.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ViewTransition>
					<ViewportGate>
						<Background />
						<div className="site-content">
							<Navbar />
							<main>{children}</main>
						</div>
					</ViewportGate>
				</ViewTransition>
			</body>
		</html>
	);
}
