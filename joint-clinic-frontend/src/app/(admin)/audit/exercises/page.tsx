"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { useState } from "react";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import SearchInput from "@/components/atoms/searchInput";
import SessionCard from "@/components/molecules/sessionCard";
import Button from "@/components/atoms/Button";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import PageHeader from "@/components/organisms/PageHeader";

interface Exercise {
    id: number;
    imageSrc: string;
    title: string;
    status?: string;
    minutes?: number;
}

const exercises: Exercise[] = [
    {
        id: 1,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Pending",
        minutes: 20,
    },
    {
        id: 2,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Completed",
    },
    {
        id: 3,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Completed",
    },
    {
        id: 4,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Completed",
    },
    {
        id: 5,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Completed",
    },
    {
        id: 6,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Stretch",
        status: "Completed",
    },
];

const Page = () => {
    const [activate, setActivate] = useState("Sholders");
    return (
        <>
            <DashBoardHeader therapyName={data.therapyName} nav={false} dateTime={true} />
            <DashBoardContent>
                <PageHeader
                    title="Workout Library"
                    searchPlaceholder="Search By Name"
                    searchValue=""
                    // onSearchChange={() => {}} // Connect logic later
                    actionButton={{
                        label: "Upload Video",
                        onClick: () => { }
                    }}
                    filters={[
                        { label: "Shoulder", active: true },
                        { label: "Arm", active: true },
                        { label: "Back", active: true }
                    ]}
                />

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {exercises.map((exercise) => (
                        <SessionCard
                            key={exercise.id}
                            imageSrc={exercise.imageSrc}
                            title={exercise.title}
                            status={exercise.status}
                            minutes={exercise.minutes}
                        />
                    ))}
                </section>
            </DashBoardContent>
        </>
    );
};

export default Page;
