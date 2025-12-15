"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { useState } from "react";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import SearchInput from "@/components/atoms/searchInput";
import SessionCard from "@/components/molecules/sessionCard";
import Button from "@/components/atoms/Button";
import UploadWorkout from "./UploadWorkout";
import SessionVideo from "./SessionVideo";

const Page = () => {
    const [activate, setActivate] = useState("Sholders");
    const [isUploading, setIsUploading] = useState(false);

    // ⛔ لو ضغط الزرار → اعرض الـ UploadWorkout فقط
    if (isUploading) {
        return <UploadWorkout onClose={() => setIsUploading(false)}/>;
    }

    return (
        <>
            <DashBoardHeader therapyName={data.therapyName} nav={false} />

            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 ">
                        <Typography 
                            text="Workout Library" 
                            variant="heading1"
                            style={{
                                color: color.secondary,
                                fontWeight: "bold",
                                fontSize: "45px"
                            }} 
                        />

                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="btns flex flex-row justify-center gap-6 items-center mt-[20px]">
                                <Button text="Sholders" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                                <Button text="Arm" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                                <Button text="Back" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6 items-end mt-[20px]">
                        <SearchInput className="w-[260px] sm:w-[320px] md:w-[380px]" />

                        <Button 
                            text="Upload New Video"
                            variant="fourth"
                            active={true}
                            className="w-[150px] sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]"
                            onClick={() => setIsUploading(true)}
                        />
                    </div>
                </div>

                <section className="exercices flex flex-row flex-wrap gap-[30px] w-full justify-center items-center">
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Pending" minutes={20} className="w-[400px]" />
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Completed" className="w-[400px]" />
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Completed" className="w-[400px]" />
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Completed" className="w-[400px]" />
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Completed" className="w-[400px]" />
                    <SessionCard imageSrc="/sessionCard.png" title="Shoulder Stretch" status="Completed" className="w-[400px]" />
                </section>
            </main>
            {/* <SessionVideo/> */}
        </>
    );
};

export default Page;
