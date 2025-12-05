"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import SessionCard from "@/components/molecules/sessionCard";

interface Exercise {
    id: number;
    imageSrc: string;
    title: string;
    status?: string;
    minutes?: number;
}

const assignedExercises: Exercise[] = [
    {
        id: 1,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        status: "Completed",
    },
    {
        id: 2,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        minutes: 5,
        status: "Pending",
    },
    {
        id: 3,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        minutes: 5,
        status: "Pending",
    }
];

const watchListExercises: Exercise[] = [
    {
        id: 4,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        minutes: 5,
        status: "Pending",
    },
    {
        id: 5,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        minutes: 5,
        status: "Pending",
    },
    {
        id: 6,
        imageSrc: "/sessionCard.png",
        title: "Session Number 3",
        minutes: 5,
        status: "Pending",
    }
];

const AssignedPage = () => {
    return (
        <main className="w-full h-full flex flex-col gap-12 p-4 md:p-8 overflow-y-auto custom-scrollbar">

            {/* Assigned by doctor Section */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between items-end">
                        <Typography
                            text="Assigned by doctor"
                            variant="heading2"
                            style={{ color: color.secondary, fontWeight: "bold", fontSize: "32px" }}
                        />
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#1E5598] text-lg">Last Assign was:</span>
                            <span className="text-[#1C9A55] text-lg font-medium">3 days ago</span>
                        </div>
                    </div>
                    <Typography
                        text="Please note that these exercises were assigned by your doctor directly to match your plan"
                        variant="bodyRegular"
                        className="text-gray-400"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {assignedExercises.map((exercise) => (
                        <SessionCard
                            key={exercise.id}
                            id={exercise.id}
                            imageSrc={exercise.imageSrc}
                            title={exercise.title}
                            status={exercise.status}
                            minutes={exercise.minutes}
                            className="w-full"
                        />
                    ))}
                </div>
            </section>

            <hr className="border-gray-300" />

            {/* Added to watch list Section */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Typography
                        text="Added to watch list"
                        variant="heading2"
                        style={{ color: color.secondary, fontWeight: "bold", fontSize: "32px" }}
                    />
                    <Typography
                        text="Please note that those are the exercises you added to your profile"
                        variant="bodyRegular"
                        className="text-gray-400"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {watchListExercises.map((exercise) => (
                        <SessionCard
                            key={exercise.id}
                            id={exercise.id}
                            imageSrc={exercise.imageSrc}
                            title={exercise.title}
                            status={exercise.status}
                            minutes={exercise.minutes}
                            className="w-full"
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AssignedPage;
