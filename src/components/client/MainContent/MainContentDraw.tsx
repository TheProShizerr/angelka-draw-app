"use client"

import { useWinnerContext } from "@/context/WinnerContext"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { getAllUsers } from "@/lib/api/getAllUsers"
import { getWinner } from "@/lib/api/getWinner"
import { DicesIcon, Timer, Users, ShuffleIcon, Loader2, Trophy } from "lucide-react"
import { BorderTrail } from "@/components/ui/border-trail"
import { User } from "@/components/interfaces/user"

export default function MainContentDraw() {
	const [draw, setDraw] = useState<boolean>(false)
	const [participant, setParicipant] = useState<User>({ id: 0, username: "", avatar: "" })
	const [winner, setWinner] = useState<User>({ id: 0, username: "", avatar: "" })
	const [winnerAnimation, setWinnerAnimation] = useState<boolean>(false)
	const { setWinnerParticipant, participantLength } = useWinnerContext()
	const [loader, setLoader] = useState<boolean>(false)
	const [borderAnimation, setBorderAnimation] = useState<boolean>(false)
	const timeDraw = useRef(0)
	const currentElement = useRef(0)
	const searchParams = useSearchParams()
	const category = searchParams.get("category") || "user"

	useEffect(() => {
		setWinnerParticipant(null)
		setWinner({ id: 0, username: "", avatar: "" })
		setWinnerAnimation(false)
		setDraw(false)
		setBorderAnimation(false)
		timeDraw.current = 0
		currentElement.current = 0
	}, [category, setWinner, setWinnerParticipant, setWinnerAnimation])

	const determinateWinner = useCallback(async () => {
		const data = await getWinner(category)
		const participantList = await getAllUsers(category)

		setLoader(false)
		setBorderAnimation(true)
		setWinner({ id: data.id, username: data.username, avatar: data.avatar })

		const interval = setInterval(() => {
			if (currentElement.current > participantList.users.length - 1) {
				clearInterval(interval)
				setDraw(false)
				setBorderAnimation(false)
				setWinnerParticipant(prev => [...(prev || []), { username: data.username, id: data.id }])
				setWinnerAnimation(true)
				return
			}
			const user = participantList.users[currentElement.current]
			setParicipant({ id: user.id, username: user.username, avatar: user.avatar })

			currentElement.current = ++currentElement.current
		}, 50)

		return () => clearInterval(interval)
	}, [setWinner, setDraw, setWinnerParticipant, setWinnerAnimation, category])

	useEffect(() => {
		const intervalTimeDraw = setInterval(() => {
			timeDraw.current = ++timeDraw.current
		}, 1000)

		return () => clearInterval(intervalTimeDraw)
	}, [setDraw])

	useEffect(() => {
		if (!draw) return

		determinateWinner()
	}, [draw, determinateWinner])

	const startDraw = () => {
		setLoader(true)
		setDraw(true)
		setWinner({ id: 0, username: "", avatar: "" })
		setWinnerAnimation(false)
		currentElement.current = 0
		timeDraw.current = 0
	}

	return (
		<>
			<div className="relative max-md:w-full max-md:flex max-md:justify-center max-md:z-50">
				<div className="absolute left-1/2 top-1/2 -translate-1/2 w-[35rem] h-[30rem] bg-purpleDarknesColor/60 blur-[250px]   z-0"></div>
				<div className="relative w-[40rem] max-md:w-11/12">
					<div className="flex justify-center items-center gap-5 w-full px-3 max-md:grow max-md:col-rows-2">
						<div className="flex items-center gap-3 bg-boxColor border border-purple-900/50 rounded-xl p-3 flex-grow  opacity-90 w-96">
							<div className="bg-purple-900/30 p-3 rounded-lg w-fit">
								<Users className="text-purpleTextColor w-6 h-6" />
							</div>
							<div className="">
								<p className="text-textColor text-sm">Uczestniczy</p>
								<p className="font-semibold text-lg">{participantLength}</p>
							</div>
						</div>
						<div className="flex items-center gap-3 bg-boxColor border border-purple-900/50 rounded-xl p-3 flex-grow  opacity-90 w-96">
							<div className="bg-purple-900/30 p-3 rounded-lg w-fit">
								<ShuffleIcon className="text-purpleTextColor w-6 h-6" />
							</div>
							<div className="">
								<p className="text-textColor text-sm">Rozlosowani</p>
								<p className="font-semibold text-lg">{currentElement.current || 0}</p>
							</div>
						</div>
						<div className="flex items-center gap-3 bg-boxColor border border-purple-900/50 rounded-xl p-3 flex-grow opacity-90 w-96">
							<div className="bg-purple-900/30 p-3 rounded-lg w-fit">
								<Timer className="text-purpleTextColor w-6 h-6" />
							</div>
							<div className="">
								<p className="text-textColor text-sm">Czas losowania</p>
								<p className="font-semibold text-lg">{timeDraw.current}s</p>
							</div>
						</div>
					</div>
					<div className="w-full bg-boxColor border-2 border-purpleDarknesColor rounded-xl mt-3 z-50 relative">
						{borderAnimation && <BorderTrail />}
						<div className="flex items-center justify-between p-5 px-6">
							<div className="flex items-center gap-2">
								<DicesIcon className="text-purpleTextColor" />
								<h1 className="text-xl">Losowanie zwycięzcy</h1>
							</div>
							{winnerAnimation && (
								<div className="flex items-center gap-2 bg-purpleDarknesColor/30 px-5 p-2 rounded-full font-semibold uppercase animate-bounce text-purpleTextColor text-sm">
									<Trophy className="w-4 h-4" />
									<span>Zwycięzca!</span>
								</div>
							)}
						</div>
						<div className="w-full h-[1px] bg-lineColor"></div>
						<div className="flex items-center justify-center p-5 px-6 h-60">
							<div className="flex flex-col justify-center items-center gap-5 h-full">
								<div className="relative">
									{winnerAnimation && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purpleDarknesColor blur-2xl z-0 animate-pulse"></div>}

									<div className="flex items-center justify-center bg-purple-900/30 border border-purple-900/50 h-20 w-20 rounded-full text-xl font-semibold z-50 relative">
										<span className="uppercase">{draw ? participant.avatar : winner.avatar || "Z"}</span>
									</div>
								</div>

								<div className="text-center">
									{loader && <div className="bg-lineColor h-7 w-52 rounded-xl animate-pulse"></div>}

									<p className="text-gray-200 text-2xl font-semibold mb-2">{draw ? participant.username : winner.username || "Zacznij losować"}</p>
									<span className="text-textColor">ID #{draw ? participant.id : winner.id}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center mt-4">
						<button
							className="flex items-center gap-3 bg-boxColor p-3 border border-purpleDarknesColor rounded-lg text-purpleTextColor font-semibold uppercase px-10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:text-textColor"
							disabled={draw}
							onClick={startDraw}>
							{draw ? <Loader2 className="animate-spin" /> : <ShuffleIcon />}
							<span>{draw ? "Trwa losowanie" : "Rozpocznij losowanie"}</span>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
