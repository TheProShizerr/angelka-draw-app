"use client"

import { ChevronLeft, ChevronRight, Loader as Loader2, Settings, Users } from "lucide-react"
import { AllUser } from "../interfaces/allUsers"
import { useCallback, useEffect, useState } from "react"
import { getMoreParticipant } from "@/lib/api/getMoreParticipant"
import SidebarSearch from "./Sidebar/Search/SidebarSearch"
import SidebarSearchError from "./Sidebar/Search/SidebarSearchError"
import SidebarSettings from "./Sidebar/Settings/SidebarSettings"
import { useSearchParams } from "next/navigation"
import { getUsers } from "@/lib/api/getUsers"
import SidebarSkieletonLoader from "./Sidebar/Search/SidebarSkieletonLoader"
import SidebarBox from "./Sidebar/SidebarBox"
import { useSession } from "next-auth/react"
import { useWinnerContext } from "@/context/WinnerContext"

interface Type {
	users: AllUser[]
	allParticipants: number
	uniqueParticipants: number
}

export default function Sidebar() {
	const [user, setUsers] = useState<Type>({ users: [], allParticipants: 0, uniqueParticipants: 0 })
	const [hidden, setHidden] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)
	const [searchText, setSearchText] = useState<string>("")
	const [searchLoader, setSearchLoader] = useState<boolean>(false)
	const [searchData, setSearchData] = useState<AllUser[]>([])
	const [settings, setSettings] = useState<boolean>(false)
	const { setParticipantLength } = useWinnerContext()
	const { data: session, status } = useSession()

	const serachParams = useSearchParams()

	const category = serachParams.get("category") || "user"

	const getUsersList = useCallback(async () => {
		setUsers({ users: [], allParticipants: 0, uniqueParticipants: 0 })

		const dataList = await getUsers(category)
		setParticipantLength(dataList.allParticipants)
		setUsers({ users: dataList.users, allParticipants: dataList.allParticipants, uniqueParticipants: dataList.uniqueParticipants })
	}, [category, setUsers])

	useEffect(() => {
		setSettings(false)
	}, [searchText])

	useEffect(() => {
		getUsersList()
		setSearchText("")
	}, [category, getUsersList])

	const loadMoreParicipant = async () => {
		setLoader(true)
		const data = await getMoreParticipant(user.users.length, category)

		setUsers(prev => ({
			...prev,
			users: [...prev.users, ...data.users],
			allParticipants: prev.allParticipants,
			uniqueUsers: prev.uniqueParticipants,
		}))

		setLoader(false)
	}

	useEffect(() => {
		if (status === "loading") return

		if (!session) {
			setHidden(false)
		} else {
			setHidden(true)
		}
	}, [session, status])

	return (
		<div
			className={`flex flex-col bg-boxColor transition-all ${
				hidden ? "w-14" : "w-85"
			} h-screen shrink-0 max-md:absolute max-md:z-30  border-r border-purpleDarknesColor relative max-md:w-0 max-md:overflow-hidden`}>
			<button
				className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-boxColor/80 hover:bg-boxColor  flex items-center justify-center w-9 h-9 border border-purpleDarknesColor rounded-full  cursor-pointer"
				onClick={() => setHidden(!hidden)}>
				{hidden ? <ChevronRight className="text-purpleTextColor w-5 h-5" /> : <ChevronLeft className="text-purpleTextColor w-5 h-5" />}
			</button>
			{hidden && (
				<div className="absolute left-1/2 top-1/2 -translate-1/2   flex items-center justify-center">
					<p className="-rotate-90 text-nowrap text-sm text-purpleTextColor/60">Uczestnicy ({user.allParticipants})</p>
				</div>
			)}
			<div className="flex items-center  justify-between border-b border-purpleDarknesColor">
				<div className="flex items-center gap-2 p-4">
					<Users className="text-purpleTextColor w-6 h-6" />
					{!hidden && <p className="text-xl text-purpleTextColor font-semibold">Uczestnicy</p>}
				</div>
				{!hidden && (
					<div className="flex items-center gap-1 pr-4">
						<button className="hover:bg-purpleDarknesColor/80 p-1.5 rounded-lg cursor-pointer" onClick={() => setSettings(!settings)}>
							<Settings className="w-4 h-4 text-purpleTextColor" />
						</button>
						<p className="bg-purpleDarknesColor rounded-full px-3 p-1 text-sm">{user.allParticipants}</p>
					</div>
				)}
			</div>

			{searchLoader && !hidden && searchData?.length !== 0 && (
				<div className="flex flex-col justify-center items-center mt-10 text-gray-400">
					<Loader2 className="animate-spin my-2" />
					<p>Szukam</p>
				</div>
			)}
			{searchText && searchData?.length === 0 && <SidebarSearchError setSearchText={setSearchText} />}
			<div className={`${settings && "h-48"}`}>
				{!hidden && (
					<div className={`transition-all ${settings ? "h-full" : "h-0"} overflow-hidden`}>
						<SidebarSettings />
					</div>
				)}
			</div>

			{!hidden && (
				<div className="relative flex-grow overflow-hidden scrollbar scrollbar-thumb-purpleTextColor   scrollbar-track-purple-500/20  h-32 overflow-y-auto  p-2">
					{user.users.length === 0 && <SidebarSkieletonLoader />}
					{searchData?.length > 0 && searchData.map((el, index) => <SidebarBox key={index} index={index} username={el.username} percentToWin={el.percentToWin} repeat={el.repeat} />)}

					{!searchLoader && searchData.length === 0 && !searchText && (
						<>
							{user.users.map((el, index) => (
								<SidebarBox key={index} index={index} username={el.username} percentToWin={el.percentToWin} repeat={el.repeat} />
							))}
							{user.users.length <= user.uniqueParticipants && (
								<div className="p-2 w-full">
									<button
										className="flex items-center justify-center gap-2 bg-purple-900/30 w-full rounded-lg p-2 cursor-pointer disabled:bg-purple-900/10 text-purpleTextColor"
										onClick={loadMoreParicipant}
										disabled={loader}>
										{!loader && (
											<>
												<span>Załaduj więcej</span>
												<ChevronRight className="w-5 h-5" />
											</>
										)}
										{loader && <Loader2 className="w-5 h-5 animate-spin" />}
									</button>
								</div>
							)}
						</>
					)}
				</div>
			)}
			{!hidden && <SidebarSearch setSearchLoader={setSearchLoader} setSearchData={setSearchData} setSearchText={setSearchText} searchText={searchText} />}
		</div>
	)
}
