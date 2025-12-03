import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";

const Page = () => {
  return (
    <>
      <DashBoardHeader therapyName={data.therapyName} nav={false} />
      <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography variant="heading1" style={{ color: color.secondary }}>
            Welcome Back,
          </Typography>
          <Typography variant="heading1" style={{ color: color.primary }}>
            {data.patientName}
          </Typography>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="heading2" style={{ color: color.secondary }}>
            Progress
          </Typography>
          <ProgressBar percentage={data.progressPercentage} />
          <div className="flex flex-col md:flex-row justify-between w-full pr-0 md:pr-12 gap-4 md:gap-0">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography variant="bodyBold" style={{ color: color.secondary }}>
                  Number Of sessions:
                </Typography>
                <Typography variant="bodyBold" style={{ color: color.success }}>
                  {data.totalSessions}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography variant="bodyBold" style={{ color: color.secondary }}>
                  Treatment length:
                </Typography>
                <Typography variant="bodyBold" style={{ color: color.success }}>
                  {data.treatmentLength}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography variant="bodyBold" style={{ color: color.secondary }}>
                  Sessions completed:
                </Typography>
                <Typography variant="bodyBold" style={{ color: color.success }}>
                  {data.sessionsCompleted}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 justify-between md:justify-start">
                <Typography variant="bodyBold" style={{ color: color.secondary }}>
                  Exercises completed:
                </Typography>
                <Typography variant="bodyBold" style={{ color: color.success }}>
                  {data.exercisesCompleted}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        {/* Summary Section */}
        <div className="flex flex-col gap-4">
          <Typography variant="heading2" style={{ color: color.secondary }}>
            Week 3 summary
          </Typography>
          <div className="flex flex-col gap-2">
            {data.summaryItems.map((item, index) => (
              <SummaryItem key={index} {...item} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
