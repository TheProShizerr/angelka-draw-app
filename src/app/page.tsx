import MainContentHistoryList from "@/components/client/MainContent/MainContentHistoryList"
import LoadParticipiant from "@/components/server/loadParticipiant"
import LoadParticipiantContent from "@/components/server/loadParticipiantContent"
import { Suspense } from "react"

export default function Home() {
	return (
		<Suspense>
			<div className="flex h-screen">
				<LoadParticipiant />
				<div className="relative flex  w-full h-screen">
					<LoadParticipiantContent />
					<div className="flex-grow"></div>
					<MainContentHistoryList />
				</div>
			</div>
		</Suspense>
	)
}
