import prisma from "@/lib/prisma"

interface RequestBody {
	username: string
}

export async function POST(request: Request): Promise<Response> {
	const data: RequestBody = await request.json()

	if (!data.username || typeof data.username !== "string") {
		return new Response(JSON.stringify({ message: "You must provide a comma-separated string of usernames" }), { status: 400 })
	}

	const usernames: string[] = data.username
		.split(",")
		.map(name => name.trim())
		.filter(name => name)

	try {
		const existingUsers = await prisma.user.findMany({
			where: { username: { in: usernames } },
			select: { username: true },
		})

		const existingUsernames = new Set(existingUsers.map(user => user.username))
		const newUsers = usernames.filter(username => !existingUsernames.has(username))

		if (newUsers.length === 0) {
			return new Response(JSON.stringify({ message: "All users already exist" }), { status: 409 })
		}

		const createdUsers = await prisma.user.createMany({
			data: newUsers.map(username => ({ username })),
		})

		return new Response(JSON.stringify({ message: `Created ${createdUsers.count} users` }), { status: 200 })
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 })
	}
}
