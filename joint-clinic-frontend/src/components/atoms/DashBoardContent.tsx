
const DashBoardContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full h-full flex flex-col gap-6 p-4 pl-[36px] md:p-4 md:pl-[60px] lg:pl-[60px] overflow-y-auto custom-scrollbar">
            {children}
        </main>
    )
}

export default DashBoardContent