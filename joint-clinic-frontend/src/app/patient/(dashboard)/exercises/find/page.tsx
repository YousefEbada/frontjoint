"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import SearchInput from "@/components/atoms/searchInput";
import ExerciseGrid from "@/components/organisms/ExerciseGrid/ExerciseGrid";
import { color } from "@/lib/constants/colors";

import { useExercises } from "@/hooks/useExercises";
// All exercises removed, fetching from API now

export default function FindExercisesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: exercises, isLoading } = useExercises();

    // Map Backend Data to UI Model
    const allExercisesList = exercises?.map((ex: any) => ({
        id: ex._id,
        imageSrc: "/sessionCard.png",
        title: ex.title,
        status: "Available", // Or derived status if needed
        minutes: 15 // Mock minutes if not in DB
    })) || [];

    // Filter Logic
    const filteredExercises = allExercisesList.filter(ex =>
        ex.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add click handler to navigate
    const handleExerciseClick = (id: string) => {
        window.location.href = `/patient/exercises/${id}`;
    };

    return (
        <main className="w-full h-full flex flex-col gap-8 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <Typography
                    text="Shoulder Exercises"
                    variant="heading2"
                    style={{ color: color.secondary, fontWeight: "bold", fontSize: "32px" }}
                />
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search"
                    className="w-full md:w-[320px]"
                    // rightIcon={<FilterIcon />} // Add filter icon later if needed
                    rightIcon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                    }
                />
            </div>

            <section className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <Typography text="Loading exercises..." variant="bodyRegular" className="text-gray-500" />
                    </div>
                ) : (
                    <ExerciseGrid exercises={filteredExercises} onExerciseClick={handleExerciseClick} />
                )}
            </section>
        </main>
    );
}
