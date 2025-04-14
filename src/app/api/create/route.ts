import prisma from "@/lib/prisma"

export async function POST(request: Request) {
	const data = await request.json()

	if (!data.username) return new Response(JSON.stringify({ message: "You must give username" }), { status: 400 })

	try {
		const getData = await prisma.user.findMany({})

		const checkIsExist = getData.some(el => el.username === data.username)

		if (checkIsExist) return new Response(JSON.stringify({ message: "This user is already exists" }), { status: 409 })

		const create = await prisma.user.create({
			data: { username: data.username },
		})

		return new Response(JSON.stringify({ message: `user created, id ${create.id}` }), { status: 200 })
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "internal server error" }), { status: 500 })
	}
}
