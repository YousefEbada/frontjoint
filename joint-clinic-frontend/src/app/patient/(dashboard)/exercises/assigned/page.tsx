"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import SessionCard from "@/components/molecules/sessionCard";
import { useExercises } from "@/hooks/useExercises";

interface Exercise {
    id: number;
    imageSrc: string;
    title: string;
    status?: string;
    minutes?: number;
}

// const assignedExercises: Exercise[] = [];

// Watchlist feature removed as no API exists yet
// const watchListExercises: Exercise[] = [];

const AssignedPage = () => {
    const { data: exercises, isLoading } = useExercises();

    // In a real app, we would filter by "Assigned" vs "Watchlist"
    // For now, we'll just show all fetched exercises in the "Assigned" section
    // and keep the watchlist as mock or empty since we don't have that API yet.

    // Map API exercises to UI format
    const assignedList = exercises?.map((ex: any) => ({
        id: ex.id,
        imageSrc: ex.imageSrc || "/sessionCard.png",
        title: ex.title,
        status: ex.status || "Pending",
        minutes: ex.minutes || 15
    })) || [];

    return (
        <main className="w-full h-full flex flex-col gap-12 p-4 md:p-8 overflow-y-auto custom-scrollbar">

            {/* Assigned by doctor Section */}
            <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
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
                    {isLoading ? (
                        <div className="col-span-3 text-center py-8">
                            <Typography text="Loading exercises..." variant="bodyRegular" />
                        </div>
                    ) : assignedList.length > 0 ? (
                        assignedList.map((exercise) => (
                            <SessionCard
                                key={exercise.id}
                                id={exercise.id}
                                imageSrc={exercise.imageSrc}
                                title={exercise.title}
                                status={exercise.status}
                                minutes={exercise.minutes}
                                className="w-full"
                            />
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-8">
                            <Typography text="No assigned exercises found." variant="bodyRegular" className="text-gray-500" />
                        </div>
                    )}
                </div>
            </section>

            <hr className="border-gray-300" />

            {/* Added to watch list Section */}
            {/* Added to watch list Section - Removed as per no-mock-data requirement */}
            {/* <section className="flex flex-col gap-4">
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
                     <Typography text="Watchlist feature coming soon." variant="bodyRegular" className="text-gray-500" />
                </div>
            </section> */}
        </main>
    );
};

export default AssignedPage;
