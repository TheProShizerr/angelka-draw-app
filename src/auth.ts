import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
	trustHost: true,
	providers: [
		CredentialsProvider({
			name: "Credentials",

			async authorize(credentials) {
				const user = { name: process.env.LOGIN }

				if (credentials.login !== process.env.LOGIN || credentials.password !== process.env.PASSWORD) return null

				return user
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
})
