"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import PageHeader from "@/components/organisms/PageHeader";
import { useExercises } from "@/hooks/useExercises";
import SessionCard from "@/components/molecules/sessionCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

    const { data: exercises, isLoading, isError } = useExercises();

    // Filter exercises based on search and muscle groups
    const filteredExercises = exercises?.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMuscles = selectedMuscles.length === 0 ||
            selectedMuscles.some(muscle =>
                exercise.musclesTargeted.some(target =>
                    target.toLowerCase().includes(muscle.toLowerCase())
                )
            );
        return matchesSearch && matchesMuscles;
    }) || [];

    const handleFilterToggle = (muscle: string) => {
        setSelectedMuscles(prev =>
            prev.includes(muscle)
                ? prev.filter(m => m !== muscle)
                : [...prev, muscle]
        );
    };

    const handleUploadClick = () => {
        router.push('/audit/exercises/uploadWorkout');
    };

    const handleExerciseClick = (exerciseId: string) => {
        router.push(`/audit/exercises/video/${exerciseId}`);
    };

    console.log(exercises);

    return (
        <>
            <DashBoardHeader therapyName={data.therapyName} nav={false} dateTime={true} />
            <DashBoardContent>
                <PageHeader
                    title="Workout Library"
                    searchPlaceholder="Search By Name"
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}                   
                    actionButton={{
                        label: "Upload Video",
                        onClick: handleUploadClick
                    }}
                    filters={[
                        {
                            label: "Shoulders",
                            active: selectedMuscles.includes("Shoulders"),
                            onClick: () => handleFilterToggle("Shoulders")
                        },
                        {
                            label: "Arms",
                            active: selectedMuscles.includes("Arms"),
                            onClick: () => handleFilterToggle("Arms")
                        },
                        {
                            label: "Back",
                            active: selectedMuscles.includes("Back"),
                            onClick: () => handleFilterToggle("Back")
                        },
                        {
                            label: "Legs",
                            active: selectedMuscles.includes("Legs"),
                            onClick: () => handleFilterToggle("Legs")
                        },
                        {
                            label: "Core",
                            active: selectedMuscles.includes("Core"),
                            onClick: () => handleFilterToggle("Core")
                        }
                    ]}
                />

                {isLoading ? (
                    <div className="text-center py-10 text-gray-400">Loading exercises...</div>
                ) : isError ? (
                    <div className="text-center py-10 text-red-500">Failed to load exercises</div>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {filteredExercises.length === 0 ? (
                            <div className="col-span-full text-center py-10 text-gray-400">
                                No exercises found
                            </div>
                        ) : (
                            filteredExercises.map((exercise) => (
                                <SessionCard
                                    key={exercise._id}
                                    imageSrc="/sessionCard.png"
                                    title={exercise.title}
                                    status={exercise.difficultyLevel ? exercise.difficultyLevel.charAt(0).toUpperCase() + exercise.difficultyLevel.slice(1) : "Available"}
                                    onClick={() => handleExerciseClick(exercise._id)}
                                />
                            ))
                        )}
                    </section>
                )}
            </DashBoardContent>
        </>
    );
};

export default Page;
