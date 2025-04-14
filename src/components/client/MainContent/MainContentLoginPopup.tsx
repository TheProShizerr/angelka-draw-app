"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Key, User } from "lucide-react"
import { useState } from "react"

export default function MainContentLoginPopup() {
	const [password, setPassword] = useState<string>("")
	const [login, setLogin] = useState<string>("")

	const loginButton = async () => {
		console.log(process.env.PASSWORD)
		signIn("credentials", {
			password,
			login,
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center bg-boxColor w-[27rem] border border-purpleDarknesColor/80 z-[100] p-5 rounded-lg">
			<div className="flex items-center justify-center bg-purpleDarknesColor/40 w-20 h-20 rounded-full">
				<Key className="text-purpleTextColor w-8 h-8" />
			</div>
			<div className="mt-5 text-center">
				<p className="text-2xl font-semibold">Witaj pononownie!</p>
				<p className="text-textColor mt-3">Zaloguj się aby kontynuować losować</p>
			</div>
			<div className="mt-5 w-full">
				<div className="flex flex-col w-full">
					<label htmlFor="login" className="text-textColor font-semibold mb-1 text-sm">
						Login
					</label>
					<div className="relative w-full">
						<input
							type="text"
							className="bg-background p-2 border border-purpleDarknesColor rounded-lg w-full pl-10 py-2.5 focus:outline-none"
							placeholder="Wprowadź login"
							id="login"
							onChange={e => setLogin(e.target.value)}
						/>
						<User className="absolute top-1/2 left-2 -translate-y-1/2 text-purpleTextColor w-5 h-5" />
					</div>
				</div>
				<div className="flex flex-col w-full mt-5">
					<label htmlFor="password" className="text-textColor font-semibold mb-1 text-sm">
						Hasło
					</label>
					<div className="relative w-full">
						<input
							type="password"
							className="bg-background p-2 border border-purpleDarknesColor rounded-lg w-full pl-10 py-2.5 focus:outline-none"
							placeholder="Wprowadź hasło"
							id="password"
							onChange={e => setPassword(e.target.value)}
						/>
						<Key className="absolute top-1/2 left-2 -translate-y-1/2 text-purpleTextColor w-5 h-5" />
					</div>
				</div>

				{/* <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl animate-shake my-3">
						<div className="flex items-center text-purple-400">
							<ShieldIcon size={18} className="mr-2" />
							<p className="text-sm">{error}</p>
						</div>
					</div> */}
			</div>
			<button className="bg-purpleDarknesColor/40 w-full p-2 rounded-lg mt-5 text-textColor transition-all cursor-pointer hover:bg-purpleDarknesColor/60" onClick={loginButton}>
				Zaloguj się
			</button>
		</motion.div>
	)
}
