export async function getMoreParticipant(count: number, category: string) {
	try {
		const data = await fetch("/api/load", {
			method: "POST",
			body: JSON.stringify({ count: count, category }),
		})
		const json = await data.json()

		return json
	} catch (err) {
		console.log(err)
	}
}
