import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import RoleManage from "@/components/atoms/roleList/roleList";
import DashBoardContent from "@/components/atoms/DashBoardContent";

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
            <DashBoardContent>
                <div className="flex flex-col md:flex-row gap-2 justify-between w-full items-start md:items-center">
                    <Typography text="CMS" variant="heading1" className="text-[32px] md:text-[45px] font-bold text-secondary" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <RoleManage title="Doctor/staff Name" major="Doctors" count={3} />
                </div>
            </DashBoardContent>
        </>
    );
};

export default Page;
