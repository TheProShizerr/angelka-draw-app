"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import FirstSposnor from "../../../../public/firstSponsor.png"
import SeconsSponsor from "../../../../public/secondSponsor.png"
import ThirdSponsor from "../../../../public/thirdSponsor.png"
import Image from "next/image"
import MainContentNotLogin from "./MainContentNotLogin"
import MainContentLoginPopup from "./MainContentLoginPopup"
import { useSession } from "next-auth/react"
import MainContentDraw from "./MainContentDraw"

export default function MainContent() {
	const [popup, setPopup] = useState<boolean>(false)
	const { data: session, status } = useSession()

	useEffect(() => {
		if (session) {
			setPopup(false)
		}
	}, [session])

	return (
		<>
			{popup && <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-100 backdrop-blur-xs"></div>}
			{status === "loading" && (
				<div className="fixed top-0 left-0 w-full h-full bg-black/80 z-100 backdrop-blur-xs flex items-center justify-center">
					<Loader2 className="w-20 h-20 animate-spin text-purpleTextColor" />
				</div>
			)}
			<div className={`absolute top-0 left-0 w-full h-full bg-[url(../../public/image.png)] bg-cover bg-no-repeat transition-all opacity-30 z-0`}>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/70 to-transparent" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
			</div>
			<div className="flex justify-center items-center w-full h-screen">
				<div className="absolute bottom-5  transition-all flex items-center justify-center w-full ">
					<div className={`flex items-center gap-5 max-lg:flex-col transition-all ${!session && "opacity-5"}`}>
						<Image src={FirstSposnor} alt="logo g4skins" className="w-62 opacity-50" />
						<Image src={SeconsSponsor} alt="logo g4skins" className="w-62 opacity-50" />
						<Image src={ThirdSponsor} alt="logo g4skins" className="w-62 opacity-50" />
					</div>
				</div>
				<div className="absolute top-3 right-3">
					<p className="opacity-20 text-sm">By TheProShizer & nejtcs</p>
				</div>

				{popup && <MainContentLoginPopup />}
				{!session && <MainContentNotLogin setPopup={setPopup} popup={popup} />}
				{session && <MainContentDraw />}
			</div>
		</>
	)
}
