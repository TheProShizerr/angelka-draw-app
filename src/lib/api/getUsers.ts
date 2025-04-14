export async function getUsers(category: string) {
	try {
		const data = await fetch(`/api/users?category=${category}`)
		const json = await data.json()

		return json
	} catch (err) {
		console.log(err)
	}
}
