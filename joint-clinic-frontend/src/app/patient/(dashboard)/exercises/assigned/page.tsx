"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import SessionCard from "@/components/molecules/sessionCard";
import { useAssignedExercises } from "@/hooks/useExercises";
import { useState, useEffect } from "react";

// ... (keep interface Exercise if useful, or adapt)

const AssignedPage = () => {
    const [patientId, setPatientId] = useState<string>("");

    useEffect(() => {
        const storedId = localStorage.getItem("patientId");
        if (storedId) {
            setPatientId(storedId);
        }
    }, []);

    const { data: exercises, isLoading } = useAssignedExercises(patientId);

    // Filter Logic: The API returns assignments.
    // Ensure we handle the structure correctly. Populated exercise is in `exerciseId` field usually.
    // Check backend repo: `populate('exerciseId')`.
    // So `ex` is { _id: assignmentId, exerciseId: { title, ... }, status: ... }

    const assignedList = exercises?.map((assignment: any) => {
        const exDetail = assignment.exerciseId || {};
        return {
            id: assignment._id, // Use assignment ID or exercise ID? Key should be unique.
            exerciseId: exDetail._id,
            imageSrc: "/sessionCard.png", // Video thumb or default
            title: exDetail.title || "Untitled Exercise",
            status: assignment.status || "Pending", // Assignment status
            minutes: exDetail.duration || 15 // If duration exists
        };
    }) || [];

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
                        {/* TODO: specific last assigned date */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#1E5598] text-lg">Last Assign was:</span>
                            <span className="text-[#1C9A55] text-lg font-medium">Recently</span>
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
                                id={exercise.exerciseId} // Pass actual exercise ID for navigation/details
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
