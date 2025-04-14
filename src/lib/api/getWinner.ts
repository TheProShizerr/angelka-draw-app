import { User } from "../../components/interfaces/user"

export async function getWinner(category: string): Promise<User> {
	try {
		const data = await fetch(`/api/draw?category=${category}`)
		const json: User = await data.json()

		return json
	} catch (err) {
		console.log(err)
		return { username: "erorr", avatar: "", id: 0 }
	}
}
