import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import StatsGrid from "@/components/organisms/StatsGrid";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";

const Page = () => {
  return (
    <>
      <DashBoardHeader therapyName={data.therapyName} nav={false} dateTime={true} />
      <DashBoardContent>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" gradient={true} />
          <Typography text={data.patientName} variant="heading1" style={{ color: color.primary }} />
        </div>

        {/* Progress Section */}
        <StatsGrid
          title="Progress"
          items={[
            { label: "Number Of sessions:", value: data.totalSessions },
            { label: "Treatment length:", value: data.treatmentLength },
            { label: "Sessions completed:", value: data.sessionsCompleted },
            { label: "Exercises completed:", value: data.exercisesCompleted },
          ]}
        />

        <hr className="border-t border-gray-300 w-full" />

        {/* Summary Section */}
        <div className="flex flex-col gap-4">
          <Typography text="Week 3 summary" variant="heading2" style={{ color: color.secondary }} />
          <div className="flex flex-col gap-2">
            {data.summaryItems.map((item, index) => (
              <SummaryItem key={index} {...item} />
            ))}
          </div>
        </div>
      </DashBoardContent>
    </>
  );
};

export default Page;
