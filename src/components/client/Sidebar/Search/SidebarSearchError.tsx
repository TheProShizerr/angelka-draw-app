import { UserIcon } from "lucide-react"

interface Type {
	setSearchText: (value: string) => void
}

export default function SidebarSearchError({ setSearchText }: Type) {
	return (
		<div className="flex flex-col justify-center items-center mt-10 text-gray-400">
			<UserIcon className="my-2" />
			<p className="my-1">Nie znaleziono uczestników</p>
			<button className="cursor-pointer text-purpleTextColor text-sm" onClick={() => setSearchText("")}>
				Wyczyść wyszukiwanie
			</button>
		</div>
	)
}
