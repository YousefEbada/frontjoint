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

import UploadWorkout from "./UploadWorkout";
import SessionVideo from "./SessionVideo";

const Page = () => {
    const [activate, setActivate] = useState("Sholders");
    const [isUploading, setIsUploading] = useState(false);
    const [activeVideo, setActiveVideo] = useState<Exercise | null>(null);

    // ⛔ If uploading, show UploadWorkout only
    if (isUploading) {
        return <UploadWorkout onClose={() => setIsUploading(false)} />;
    }

    // ⛔ If viewing video, show SessionVideo only
    if (activeVideo) {
        // You might want to pass activeVideo data to SessionVideo later
        return <SessionVideo onClose={() => setActiveVideo(null)} />;
    }

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
                        onClick: () => setIsUploading(true)
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
                            onClick={() => setActiveVideo(exercise)}
                        />
                    ))}
                </section>
            </DashBoardContent>
        </>
    );
};

export default Page;
