"use client"

import { ChevronDown, Search, X } from "lucide-react"
import { useEffect, useState, Dispatch, SetStateAction, useCallback } from "react"
import { getSearchUser } from "@/lib/api/getSearchUser"
import { useSearchParams } from "next/navigation"
import { AllUser } from "../../../interfaces/allUsers"

interface Type {
	setSearchLoader: (value: boolean) => void
	setSearchData: Dispatch<SetStateAction<AllUser[]>>
	setSearchText: (value: string) => void
	searchText: string
}

export default function SidebarSearch({ setSearchLoader, setSearchData, setSearchText, searchText }: Type) {
	const [search, setSearch] = useState<boolean>(false)
	const serachParams = useSearchParams()

	const category = serachParams.get("category") || "user"

	const getSearchUserData = useCallback(async () => {
		setSearchLoader(true)
		const data = await getSearchUser(searchText, category)

		setSearchData(data.users)
		setSearchLoader(false)
	}, [setSearchData, setSearchLoader, searchText])

	useEffect(() => {
		if (searchText.trim() !== "") {
			getSearchUserData()
		}
	}, [searchText, getSearchUserData])

	useEffect(() => {
		if (!searchText) {
			setSearchText("")
			setSearchData([])
		}
	}, [searchText])

	return (
		<div className="w-full">
			<div className={`flex flex-col items-center bg-boxColor border-t border-purpleDarknesColor transition-all p-3 ${search ? "h-28" : "h-13"}  w-full`}>
				<button className="flex items-center justify-between w-full cursor-pointer" onClick={() => setSearch(!search)}>
					<div className="flex items-center gap-2">
						<Search className="text-purpleTextColor w-4 h-4" />
						<p className="text-purpleTextColor text-sm font-semibold">Szukaj uczestnika</p>
					</div>
					<ChevronDown className={`text-purpleTextColor w-4 h-4 transition-all ${search && "rotate-180"}`} />
				</button>
				{search && (
					<div className="relative mt-3 p-2 w-full">
						<input
							type="text"
							value={searchText}
							className="bg-background/30 p-2 rounded-lg w-full border border-purpleDarknesColor pl-10 outline-none "
							placeholder="Wpisz nazwę..."
							onChange={e => setSearchText(e.target.value)}
						/>
						<Search className="absolute top-1/2 left-5 -translate-y-1/2 w-5 h-5 text-purpleTextColor" />

						{searchText && (
							<button className="flex items-center justify-center absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setSearchText("")}>
								<X />
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
