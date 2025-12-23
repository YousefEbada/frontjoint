"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import CustomSelect from "@/components/atoms/CustomSelect";
import { color } from "@/lib/constants/colors";
import Button from "@/components/atoms/Button";

interface UploadWorkoutProps {
    onClose: () => void;
}

const UploadWorkout = ({ onClose }: UploadWorkoutProps) => {

    return (
        <>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar items-center">
                {/* Welcome Section */}
                <div className="w-full md:w-[90%] lg:w-[80%] bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[30px] flex flex-col items-center h-full overflow-y-auto custom-scrollbar py-10 px-4">
                    <Typography text="Upcoming Bookings" variant="heading1" style={{
                        fontWeight: "bold",
                    }} className="text-[32px] md:text-[45px] bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center" />

                    <div className="w-full md:w-[80%]">
                        <CustomSelect items={["Shoulders", "Arm", "Back"]} placeholder="Workout Type" onChange={(e) => console.log(e)} width="100%" height="80px" />
                    </div>

                    <p style={{ color: color.secondary }} className="text-[18px] md:text-[22px] font-bold text-center">You are Uploading a Video <span style={{ color: color.success }}>Video Name</span></p>

                    <div className="relative w-full flex justify-center">
                        <input id="upload" type="file" className="hidden" onChange={(e) => console.log(e.target.files?.[0])} />
                        <label htmlFor="upload" className="w-full md:w-[370px] h-[80px] px-5 text-[18px] md:text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#6d7a80] text-center flex items-center justify-center cursor-pointer outline-none border-dashed transition">Upload File</label>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full justify-center">
                        <Button text="Cancel" variant="fourth" active={true} className="w-full sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]" onClick={onClose} />
                        <Button text="Proceed" variant="primary" active={true} className="w-full sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]" />
                    </div>
                </div>
            </main>
        </>
    );
};

export default UploadWorkout;
