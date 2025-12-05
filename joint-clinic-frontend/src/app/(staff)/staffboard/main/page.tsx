import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import PatientRow from "@/components/atoms/PatientRow";
import PatientCallRow from "@/components/atoms/PatientCallRaw";

const Page = () => {
  return (
    <>
      <DashBoardHeader therapyName={data.therapyName} nav={false} />
      <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
          <Typography text={data.patientName} variant="heading1" style={{ color: color.primary }} />
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between w-full items-center">
            <Typography text="Today’s appointments" variant="heading2" style={{ color: color.secondary }} />
            <a href="#" className="text-[#1e5598] underline text-[22px] font-medium transition-all duration-300 hover:text-[#4a8528]">View All</a>
          </div>
          <div>
            <PatientRow
              name="John Doe"
              status="Confirmed"
              statusColor="text-[#167c4f]"
              date="Oct 12th 2025 at 3:00 Pm"
            />
            <PatientRow
              name="Anwer maged"
              status="Done"
              statusColor="text-[#1E5598]"
              date="Oct 12th 2025 at 3:00 Pm"
            />
          </div>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between w-full items-center">
            <Typography text="Call Requests" variant="heading2" style={{ color: color.secondary }} />
            <a href="#" className="text-[#1e5598] underline text-[22px] font-medium transition-all duration-300 hover:text-[#4a8528]">View All</a>
          </div>
          <div>
            <PatientCallRow 
              name="John Doe"
              type="Inquiry"
              phone="123-456-7890"
              due="Due Tomorrow"
              dueColor={color.info}
              completed={false}
            />
            <PatientCallRow
              name="Anwer maged"
              type="Inquiry"
              phone="123-456-7890"
              due="Due Today"
              dueColor={color.warning}
              completed={true}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
