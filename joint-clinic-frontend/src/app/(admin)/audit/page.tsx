import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import TaskList from "../../../components/atoms/tasklist/tasklist";
import DashBoardContent from "@/components/atoms/DashBoardContent";

const Page = () => {
  const tasks = [
    { title: "Review Patient Profile", category: "Roles", due: "Due Today" },
    { title: "Review Patient Profile", category: "Roles", due: "Due Today" },
    { title: "Review Patient Profile", category: "Roles", due: "Due Today" },
    { title: "Review Patient Profile", category: "Roles", due: "Due Today" },
  ];
  return (
    <>
      <DashBoardHeader nav={false} dateTime={true} />
      <DashBoardContent>
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
      </DashBoardContent>
    </>
  );
};

export default Page;