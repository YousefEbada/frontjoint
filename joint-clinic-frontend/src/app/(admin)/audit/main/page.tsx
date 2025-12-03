import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import TaskList from "./tasklist";

const Page = () => {
    const tasks = [
        {
            title: "Assign roles for 2 new Members",
            category: "Roles",
            due: "Due Today",
            dueColor: "text-red-600"
        },
        {
            title: "Adding eid Working hours",
            category: "CMS",
            due: "Due Tomorrow",
            dueColor: "text-yellow-500"
        },
        {
            title: "Upload 3 new videos",
            category: "Video",
            due: "Due 17 Oct",
            dueColor: "text-green-600"
        },
        {
            title: "Add a new Task",
            isAdd: true
        }
    ];
    return (
        <>
            <DashBoardHeader therapyName={data.therapyName} nav={false} />
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                {/* Welcome Section */}
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
                    <Typography text="Welcome Back," variant="heading1" style={{
                        color: color.secondary,
                        fontWeight: "bold"
                    }} />
                    <Typography text={data.patientName} variant="heading1" style={{
                        color: color.primary,
                        fontWeight: "bold"
                    }} />
                </div>

                {/* Progress Section */}
                <div className="flex flex-col gap-4">
                    <Typography text="Today’s Tasks" variant="heading2" style={{ color: "#1E5598" }} />
                </div>

                <hr className="border-t border-gray-300 w-full" />

                {/* Summary Section */}
                <div className="flex flex-row gap-4 w-full">
                    <TaskList taskItems={tasks} />
                </div>
            </main>
        </>
    );
};

export default Page;
