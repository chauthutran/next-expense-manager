import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

// Define the metadata for the app
export const metadata: Metadata = {
	title: 'Expense Management Application',
	description: 'Expense Management Application',
	themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
	// themeColor: '#000000', // Set theme color for your PWA
	generator: "Next.js",
	manifest: "/manifest.json",
	keywords: ["nextjs", "next14", "pwa", "next-pwa"],
	authors: [
		{
			name: "imvinojanv",
			url: "https://www.linkedin.com/in/imvinojanv/",
		},
	],
	viewport:
		"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
	icons: [
		{ rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
		{ rel: "icon", url: "icons/icon-128x128.png" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-us">
			<body className={`flex flex-col min-h-screen ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}
