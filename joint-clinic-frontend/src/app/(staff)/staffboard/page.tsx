import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";

const Page = () => {
  return (
    <>
      <DashBoardHeader therapyName={data.therapyName} nav={false} dateTime={true} />
      <DashBoardContent>
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" style={{ color: color.secondary }} />
          <Typography text={data.patientName} variant="heading1" style={{ color: color.primary }} />
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-4">
          <Typography text="Progress" variant="heading2" style={{ color: color.secondary }} />
          <ProgressBar percentage={data.progressPercentage} />
          <div className="flex flex-col md:flex-row justify-between w-full pr-0 md:pr-12 gap-4 md:gap-0">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography text="Number Of sessions:" variant="bodyBold" style={{ color: color.secondary }} />
                <Typography text={data.totalSessions} variant="bodyBold" style={{ color: color.success }} />
              </div>
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography text="Treatment length:" variant="bodyBold" style={{ color: color.secondary }} />
                <Typography text={data.treatmentLength} variant="bodyBold" style={{ color: color.success }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography text="Sessions completed:" variant="bodyBold" style={{ color: color.secondary }} />
                <Typography text={data.sessionsCompleted} variant="bodyBold" style={{ color: color.success }} />
              </div>
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography text="Exercises completed:" variant="bodyBold" style={{ color: color.secondary }} />
                <Typography text={data.exercisesCompleted} variant="bodyBold" style={{ color: color.success }} />
              </div>
            </div>
          </div>
        </div>

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
