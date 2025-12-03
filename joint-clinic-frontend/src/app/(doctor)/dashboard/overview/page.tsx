import DashBoardHeader from "@/components/molecules/DashBoardHeader"
const data={
    therapyName:"Physiotherapy",
    sessionsCompleted:12,
    totalSessions:20,
    nextAppointment:"2024-07-15",
    progressPercentage:60,
}
const Page = () => {
  return (
    <>
        <DashBoardHeader therapyName="Physiotherapy" />
        <main className="w-full h-full">

        </main>
    </>
  )
}

export default Page
