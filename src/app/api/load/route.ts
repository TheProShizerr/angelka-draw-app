import { modelList } from "@/lib/prismaModels"

export async function POST(request: Request) {
	const data = await request.json()

	if (!data.count) {
		return new Response(JSON.stringify({ message: "count templates is required" }), { status: 400 })
	}

	if (!data.category) {
		return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 })
	}

	try {
		type AllowedCategory = keyof typeof modelList
		const model = modelList[data.category as AllowedCategory]

		const participiant = await model.findMany({ orderBy: { username: "asc" }, skip: data.count, take: 50 })
		const allParticipants = await model.count()

		const sortParticipiant: { id: number; username: string; repeat: number; percentToWin: number }[] = []

		participiant?.forEach(el => {
			const existingUser = sortParticipiant.find(user => user.username === el.username)

			if (existingUser) {
				existingUser.repeat += 1
			} else {
				sortParticipiant.push({ id: sortParticipiant.length, username: el.username, repeat: 0, percentToWin: 0 })
			}
		})

		const percentToWin = parseFloat(((1 / allParticipants) * 100).toFixed(2))

		sortParticipiant.forEach(user => {
			if (user.repeat > 0) {
				user.percentToWin = Math.ceil(parseFloat(((user.repeat + 1) * percentToWin).toFixed(2)))
				user.repeat = user.repeat + 1
			} else {
				user.percentToWin = Math.ceil(percentToWin)
				user.repeat = user.repeat + 1
			}
		})

		return new Response(JSON.stringify({ users: sortParticipiant }), { status: 200 })
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
