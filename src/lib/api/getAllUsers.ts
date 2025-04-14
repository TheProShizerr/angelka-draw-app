export async function getAllUsers(category: string) {
	try {
		const data = await fetch(`/api/allUsers?category=${category}`)
		const json = await data.json()

		return json
	} catch (err) {
		console.log(err)
	}
}
