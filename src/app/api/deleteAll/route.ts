import prisma from "@/lib/prisma"

export async function GET() {
	try {
		const deleteAll = await prisma.user.deleteMany()

		console.log(deleteAll)

		return new Response(JSON.stringify({ messages: `All user deleted (${deleteAll.count})` }))
	} catch (err) {
		console.log(err)
		return new Response(JSON.stringify({ message: "internal server error" }), { status: 500 })
	}
}
