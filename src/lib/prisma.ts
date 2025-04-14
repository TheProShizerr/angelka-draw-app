import { PrismaClient } from "@prisma/client"

// typ
const globalWithPrisma = global as typeof global & {
	prisma?: PrismaClient
}

const prisma = globalWithPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
	globalWithPrisma.prisma = prisma
}

export default prisma
