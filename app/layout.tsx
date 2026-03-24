import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getEventData } from "@/lib/content";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "FIRE - Florida Intense Rope Experience",
		template: "%s | FIRE",
	},
	description:
		"FIRE (Florida Intensive Rope Events) is an educational organization dedicated to promoting rope bondage education through three annual conventions in Orlando, FL: BLAZE, FLARE, and FIRE.",
	keywords: [
		"rope bondage",
		"BDSM education",
		"Orlando events",
		"BLAZE",
		"FLARE",
		"FIRE convention",
		"rope workshops",
		"Florida rope events",
	],
	authors: [{ name: "FIRE Events" }],
	creator: "FIRE Events",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://fireorlando.com",
		siteName: "FIRE - Florida Intense Rope Experience",
		title: "FIRE - Florida Intense Rope Experience",
		description:
			"Educational rope bondage conventions in Orlando, FL. Join us for BLAZE, FLARE, and FIRE events.",
	},
	twitter: {
		card: "summary_large_image",
		title: "FIRE - Florida Intense Rope Experience",
		description:
			"Educational rope bondage conventions in Orlando, FL. Join us for BLAZE, FLARE, and FIRE events.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const blazeEvent = getEventData('blaze-2026')
	const blazeTicketUrl = blazeEvent?.tickets?.url ?? ''

	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`${inter.variable} font-sans antialiased bg-fire-black text-foreground`}
			>
				<Header ticketUrl={blazeTicketUrl} />
				<main className="min-h-screen">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
