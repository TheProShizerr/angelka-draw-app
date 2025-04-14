import Fuse from "fuse.js"
import { modelList } from "@/lib/prismaModels"

export async function POST(request: Request) {
	const dataBodyReq = await request.json()

	if (!dataBodyReq.username) {
		return new Response(JSON.stringify({ message: "username is required" }), { status: 401 })
	}

	if (!dataBodyReq.category) {
		return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 })
	}

	try {
		type AllowedCategory = keyof typeof modelList

		const model = modelList[dataBodyReq.category as AllowedCategory]
		
		const data = await model.findMany()

		const sortParticipiant: { id: number; username: string; repeat: number; percentToWin: number }[] = []

		data?.forEach(el => {
			const existingUser = sortParticipiant.find(user => user.username === el.username)

			if (existingUser) {
				existingUser.repeat += 1
			} else {
				sortParticipiant.push({ id: sortParticipiant.length, username: el.username, repeat: 0, percentToWin: 0 })
			}
		})

		const percentToWin = parseFloat(((1 / data.length) * 100).toFixed(2))

		sortParticipiant.forEach(user => {
			if (user.repeat > 0) {
				user.percentToWin = Math.ceil(parseFloat(((user.repeat + 1) * percentToWin).toFixed(2)))
				user.repeat = user.repeat + 1
			} else {
				user.percentToWin = Math.ceil(percentToWin)
				user.repeat = user.repeat + 1
			}
		})

		const fuseOptions = {
			includeScore: true,
			threshold: 0.3,
			keys: ["username"],
		}

		const fuse = new Fuse(sortParticipiant, fuseOptions)

		const searchUser = fuse
			.search(dataBodyReq.username)
			.slice(0, 20)
			.map(result => result.item)

		return new Response(JSON.stringify({ users: searchUser }), { status: 200 })
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
