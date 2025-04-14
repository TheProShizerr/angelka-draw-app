"use client"

import { Mouse, Utensils, CupSoda } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SidebarSettings() {
	const searchParams = useSearchParams()
	const category = searchParams.get("category") || "user"

	return (
		<>
			<div className="border-b border-purpleDarknesColor transition-all overflow-hidden h-full p-4">
				<p className="font-semibold text-gray-400 text-sm">Kategorie nagród</p>
				<div className="mt-2">
					<Link href="/" className={`${category === "user" && "bg-purpleTextColor"}`}>
						<button
							className={`flex items-center justify-between gap-3 hover:bg-purpleDarknesColor w-full p-2 rounded-lg text-gray-400 cursor-pointer ${
								category === "user" && "bg-purple-900/30 border border-purple-900/50 text-textColor"
							}`}>
							<div className="flex gap-3">
								<Mouse className="w-5 h-5" />
								<span className="text-sm font-semibold">Ticket AK-47</span>
							</div>
							{category === "user" && <div className="bg-purpleTextColor w-2 h-2 rounded-full mr-2"></div>}
						</button>
					</Link>
				</div>
				<div className="mt-2">
					<Link href="?category=monster">
						<button
							className={`flex items-center justify-between gap-3 hover:bg-purpleDarknesColor w-full p-2 rounded-lg text-gray-400 cursor-pointer ${
								category === "monster" && "bg-purple-900/30 border border-purple-900/50 text-textColor"
							}`}>
							<div className="flex gap-3">
								<Utensils className="w-5 h-5" />
								<span className="text-sm font-semibold">Ticket M4A1-S</span>
							</div>
							{category === "monster" && <div className="bg-purpleTextColor w-2 h-2 rounded-full mr-2"></div>}
						</button>
					</Link>
				</div>
				<div className="mt-2">
					<Link href="?category=knife">
						<button
							className={`flex items-center justify-between gap-3 hover:bg-purpleDarknesColor w-full p-2 rounded-lg text-gray-400 cursor-pointer ${
								category === "knife" && "bg-purple-900/30 border border-purple-900/50 text-textColor"
							}`}>
							<div className="flex gap-3">
								<CupSoda className="w-5 h-5" />
								<span className="text-sm font-semibold">Ticket Paracord</span>
							</div>
							{category === "knife" && <div className="bg-purpleTextColor w-2 h-2 rounded-full mr-2"></div>}
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}
