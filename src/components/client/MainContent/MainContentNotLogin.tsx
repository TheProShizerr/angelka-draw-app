import { ChevronRight, Gamepad2, Users } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

export default function MainContentNotLogin({ setPopup, popup }: { setPopup: Dispatch<SetStateAction<boolean>>; popup: boolean }) {
	return (
		<div className="flex flex-col items-center justify-center z-0 max-md:mt-15">
			<div className="flex items-center justify-center w-25 h-25 bg-purpleDarknesColor/40 rounded-full max-md:w-15 max-md:h-15">
				<Gamepad2 className="text-purpleTextColor w-12 h-12 max-md:w-6 max-md:h-6" />
			</div>
			<div className="text-center mt-8">
				<h2 className="text-5xl font-semibold! text-purpleTextColor/80 tracking-wide max-md:text-2xl">Witaj w losowaniu!</h2>
				<p className="text-lg text-purple-100 mt-5">Zaloguj się aby rozpocząć losowanie zwycięzców spośrod wszystkich uczestników!</p>
			</div>
			<div className="flex gap-7 mt-10 max-md:flex-col max-md:w-full max-md:gap-3 max-md:items-center">
				<div className="p-6 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-purpleDarknesColor/70 text-center max-md:w-11/12">
					<div className="w-14 h-14 bg-purpleDarknesColor/40 rounded-xl flex items-center justify-center mb-4 mx-auto">
						<Users size={28} className="text-purpleTextColor" />
					</div>
					<h3 className=" font-semibold text-lg mb-2 text-purple-100">Losowanie na Żywo</h3>
					<p className="text-purple-200/70">Emocjonujące wybory</p>
				</div>
				<div className="p-6 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-purpleDarknesColor/70 text-center max-md:w-11/12">
					<div className="w-14 h-14 bg-purpleDarknesColor/40 rounded-xl flex items-center justify-center mb-4 mx-auto">
						<Users size={28} className="text-purpleTextColor" />
					</div>
					<h3 className=" font-semibold text-lg mb-2 text-purple-100">Losowanie na Żywo</h3>
					<p className="text-purple-200/70">Emocjonujące wybory</p>
				</div>
				<div className="p-6 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-purpleDarknesColor/70 text-center max-md:w-11/12">
					<div className="w-14 h-14 bg-purpleDarknesColor/40 rounded-xl flex items-center justify-center mb-4 mx-auto">
						<Users size={28} className="text-purpleTextColor" />
					</div>
					<h3 className=" font-semibold text-lg mb-2 text-purple-100">Losowanie na Żywo</h3>
					<p className="text-purple-200/70">Emocjonujące wybory</p>
				</div>
			</div>
			<button className="flex items-center gap-1 mt-10 bg-purpleDarknesColor/40 p-3 text-purpleTextColor px-5 rounded-lg cursor-pointer" onClick={() => setPopup(!popup)}>
				<span>Przejdź do logowania</span>
				<ChevronRight className="w-5 h-5" />
			</button>
		</div>
	)
}
