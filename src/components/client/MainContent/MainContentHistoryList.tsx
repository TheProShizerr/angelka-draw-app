"use client"

import { Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { useWinnerContext } from "@/context/WinnerContext"

export default function MainContentHistoryList() {
	const { winnerParticipant } = useWinnerContext()

	const variants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
	}

	return (
		<>
			<motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} className=" z-10">
				<div className={`flex flex-col border border-purpleDarknesColor bg-boxColor  h-full opacity-90 transition-all overflow-hidden ${winnerParticipant ? "w-80 h-full" : "w-0"}`}>
					<div className="flex items-center gap-3 p-4 border-b border-purpleDarknesColor">
						<div className="bg-purple-900/30 p-2 w-fit rounded-lg border border-purple-900/50">
							<Trophy className="text-purpleTextColor w-5 h-5" />
						</div>
						<div className="">
							<h2 className=" font-semibold text-lg text-purpleTextColor">Historia zywcięzców</h2>
						</div>
					</div>
					<div className="scrollbar scrollbar-thumb-purpleTextColor   scrollbar-track-purple-500/20   overflow-y-auto p-4 flex-grow">
						{winnerParticipant?.map((el, index) => (
							<div className="flex items-center gap-3 mb-4" key={index}>
								<div className="flex items-center justify-center bg-purple-900/30 p-2 w-10 h-10 rounded-lg border border-purple-900/50">
									<p className="text-purpleTextColor text-lg font-semibold uppercase">{el.username.charAt(0)}</p>
								</div>
								<div className="">
									<p className="font-semibold">{el.username}</p>
									<span className="text-textColor/70 text-sm">#{el.id}</span>
								</div>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between bg-purple-900/30 w-full p-3 text-textColor border-t border-purple-900/50">
						<p>Wszyscy wygranii</p>
						<p>{winnerParticipant?.length}</p>
					</div>
				</div>
			</motion.div>
		</>
	)
}
