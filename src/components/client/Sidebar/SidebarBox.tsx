import { Dices, UserIcon } from "lucide-react"


interface Props {
	index: number
	username: string
	percentToWin: number
	repeat: number
}

export default function SidebarBox({ index, username, percentToWin, repeat }: Props) {
	return (
		<div className="flex items-center gap-3 py-2 bg-gray-900 pl-5 pr-2 my-2 rounded-lg border border-purpleDarknesColor/50" key={index}>
			<div className="bg-purple-900/30 p-2 w-fit rounded-full border border-purple-900/50">
				<UserIcon className="text-purpleTextColor w-5 h-5" />
			</div>
			<div className="flex items-center justify-between w-full">
				<div className="w-full">
					<p className="font-semibold max-w-9/12 truncate" key={index}>
						{username}
					</p>
					<div className="flex items-center gap-1">
						<Dices className="w-3 h-3 text-textColor" />
						<span className="text-textColor text-xs">{percentToWin}.00% szans</span>
					</div>
				</div>
				<div className="bg-purple-500/10 p-2 border border-purple-500/20 rounded-lg">
					<p className="text-purple-300 font-medium text-xs">x{repeat}</p>
				</div>
			</div>
		</div>
	)
}
