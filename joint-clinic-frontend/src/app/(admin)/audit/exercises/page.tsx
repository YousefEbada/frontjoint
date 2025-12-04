"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { useState } from "react";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import TaskList from "../../../../components/atoms/tasklist/tasklist";
import SearchInput from "@/components/atoms/searchInput";
import SessionCard from "@/components/molecules/sessionCard";
import Button from "@/components/atoms/Button";

const Page = () => {
    const [activate, setActivate] = useState("Sholders");
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
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2 ">
                        <Typography text="Workout Library" variant="heading1" style={{
                            color: color.secondary,
                            fontWeight: "bold",
                            fontSize: "45px"
                        }} />
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="btns flex flex-row justify-center gap-6 items-center mt-[20px]">
                                <Button text="Sholders" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                                <Button text="Arm" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                                <Button text="Back" variant="primary" active={true} className="w-[150px] sm:w-[220px] md:w-[170px] m-0 h-[50px] text-[#1e5598]" />
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col justify-center gap-6 items-end mt-[20px]">
                        {/* search component */}
                        <SearchInput
                            // value={query}
                            // onChange={setQuery}
                            // تقدر تزود كلاس لو حابب تتحكم في العرض
                            className="w-[260px] sm:w-[320px] md:w-[380px]"
                        />

                        <Button text="Upload New Video" variant="fourth" active={true} className="w-[150px] sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]" />

                    </div>
                </div>

                <section className="exercices flex flex-row flex-wrap gap-[40px] w-full justify-center items-center">
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Pending"
                        minutes={20}
                        className="w-[460px]"
                    />
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Completed"
                        className="w-[460px]"
                    />
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Completed"
                        className="w-[460px]"
                    />
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Completed"
                        className="w-[460px]"
                    />
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Completed"
                        className="w-[460px]"
                    />
                    <SessionCard
                        imageSrc="/sessionCard.png"
                        title="Shoulder Stretch"
                        status="Completed"
                        className="w-[460px]"
                    />
                </section>
            </main>
        </>
    );
};

export default Page;
