import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Background from "@/components/Background";

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
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
