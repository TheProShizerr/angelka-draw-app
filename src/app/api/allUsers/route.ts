import prisma from "@/lib/prisma"
import { modelList } from "@/lib/prismaModels"

type ModelNames = keyof typeof prisma

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const category = searchParams.get("category") as ModelNames | null

		if (!category) {
			return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 })
		}

		type AllowedCategory = keyof typeof modelList
		const model = modelList[category as AllowedCategory]

		const participiant = await model.findMany({ orderBy: { username: "asc" } })
		const allParticipants = await model.count()

		const sortParticipiant = [{ id: 0, username: "", avatar: "", repeat: 0 }]

		participiant?.forEach(el => {
			const existingUser = sortParticipiant.find(user => user.username === el.username)

			if (existingUser) {
				existingUser.repeat += 1
			} else {
				sortParticipiant.push({ id: sortParticipiant.length, username: el.username, avatar: el.username.charAt(0), repeat: 0 })
			}
		})

		return new Response(JSON.stringify({ users: sortParticipiant, allParticipants }), { status: 200 })
	} catch (err) {
		console.error(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
