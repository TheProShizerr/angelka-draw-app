import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WinnerProvider } from "@/context/WinnerContext"
import SessionWrapper from "@/components/client/SessionWrapper"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Angelkacs konkurs",
	description: "Stronka do losowania osob wygranych z konkursu angelkics",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pl">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SessionWrapper>
					<WinnerProvider>{children}</WinnerProvider>
				</SessionWrapper>
			</body>
		</html>
	)
}
