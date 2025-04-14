import prisma from "@/lib/prisma"
import { modelList } from "@/lib/prismaModels"

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const category = searchParams.get("category")

		if (!category) {
			return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 })
		}

		type AllowedCategory = keyof typeof modelList
		const model = modelList[category as AllowedCategory]

		const [participiant, uniqueUser, allParticipants] = await prisma.$transaction([
			model.findMany({ orderBy: { username: "asc" }, take: 50 }),
			model.groupBy({
				by: ["username"],
				orderBy: { username: "asc" },
			}),
			model.count(),
		])

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

		return new Response(JSON.stringify({ users: sortParticipiant, allParticipants, uniqueParticipants: uniqueUser.length }), { status: 200 })
	} catch (err) {
		console.error(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
