export async function getSearchUser(username: string, category: string) {
	try {
		const data = await fetch("/api/search", {
			method: "POST",
			body: JSON.stringify({ username, category }),
		})
		const json = await data.json()

		return json
	} catch (err) {
		console.log(err)
	}
}
