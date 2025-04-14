"use client"

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface Types {
	username: string
	id: number
}

interface Type {
	winnerParticipant: Types[] | null
	setWinnerParticipant: Dispatch<SetStateAction<Types[] | null>>
	participantLength: number
	setParticipantLength: Dispatch<SetStateAction<number>>
}

export const WinnerContext = createContext<Type | null>(null)

export const WinnerProvider = ({ children }: { children: React.ReactNode }) => {
	const [winnerParticipant, setWinnerParticipant] = useState<Types[] | null>(null)
	const [participantLength, setParticipantLength] = useState<number>(0)

	return <WinnerContext.Provider value={{ winnerParticipant, setWinnerParticipant, setParticipantLength, participantLength }}>{children}</WinnerContext.Provider>
}

export function useWinnerContext() {
	const ctx = useContext(WinnerContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
