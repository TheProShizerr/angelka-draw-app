import { auth } from "@/auth"
import { modelList } from "@/lib/prismaModels"
import crypto from "crypto"

export async function GET(request: Request) {
	try {
		const session = await auth()
		const { searchParams } = new URL(request.url)
		const category = searchParams.get("category")

		if (!session) return new Response(JSON.stringify({ message: "You are not authorized" }), { status: 401 })

		if (!category) {
			return new Response(JSON.stringify({ message: "Invalid category" }), { status: 400 })
		}

		type AllowedCategory = keyof typeof modelList
		const model = modelList[category as AllowedCategory]

		const participiant = await model.findMany()

		const drawNumber = crypto.randomInt(0, participiant.length - 1)
		const numericParicipiant = participiant.map((el, index) => {
			return { username: el.username, id: index }
		})

		return new Response(
			JSON.stringify({
				username: numericParicipiant[drawNumber].username,
				id: numericParicipiant[drawNumber].id,
				avatar: numericParicipiant[drawNumber].username.charAt(0),
			})
		)
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
