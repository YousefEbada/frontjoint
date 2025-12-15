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
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                {/* Welcome Section */}
                <div className="w-full bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[30px] flex flex-col items-center h-full overflow-y-auto custom-scrollbar">
                    <Typography text="Upcoming Bookings" variant="heading1" style={{
                        fontWeight: "bold",
                        fontSize: "45px"
                    }} className="bg-gradient-to-b from-[#0D294D] mt-[100px] to-[#1E5598] bg-clip-text text-transparent" />
                    <CustomSelect items={["Shoulders", "Arm", "Back"]} placeholder="Workout Type" onChange={(e) => console.log(e)} width="800px" height="100px" />
                    <p style={{ color: color.secondary }} className="text-[22px] font-bold">You are Uploading a Video <span style={{ color: color.success }}>Video Name</span></p>
                    <div className="relative">
                        <input id="upload" type="file" className="hidden" onChange={(e) => console.log(e.target.files?.[0])} />
                        <label htmlFor="upload" className="md:w-[370px] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#6d7a80] text-center flex items-center justify-center cursor-pointer outline-none border-dashed transition">Upload File</label>
                    </div>
                    <div className="flex flex-row items-center gap-10">
                        <Button text="Cancel" variant="fourth" active={true} className="w-[150px] sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]" onClick={onClose} />
                        <Button text="Proceed" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]" />
                    </div>
                </div>
            </main>
        </>
    );
};

export default UploadWorkout;
