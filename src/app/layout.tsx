import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Background from "@/components/Background";
import { ViewTransition } from "react";
import { View } from "lucide-react";

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
				<Background />
				<div className="site-content">
					<Navbar />
					<ViewTransition>
						<main>{children}</main>
					</ViewTransition>
				</div>
			</body>
		</html>
	);
}
