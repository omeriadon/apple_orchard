import type { Metadata } from "next";
import "./globals.css";

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
			<body>{children}</body>
		</html>
	);
}
