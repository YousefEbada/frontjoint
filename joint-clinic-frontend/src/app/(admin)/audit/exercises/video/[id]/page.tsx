"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { useExerciseById, useExerciseVideo, useDeleteExercise } from "@/hooks/useExercises";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const SessionVideo = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params?.id as string;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { data: exercise, isLoading: isLoadingExercise, error: exerciseError } = useExerciseById(id);
    const { data: videoUrl, isLoading: isLoadingVideo, error: videoError } = useExerciseVideo(id);
    const { mutate: deleteExercise, isPending: isDeleting } = useDeleteExercise();

    // Debug logging
    console.log("Admin Video Page - Exercise ID:", id);
    console.log("Admin Video Page - Exercise data:", exercise);
    console.log("Admin Video Page - Is loading:", isLoadingExercise);
    console.log("Admin Video Page - Error:", exerciseError);
    console.log("Admin Video Page - Video URL:", videoUrl);
    console.log("Admin Video Page - Video Error:", videoError);

    const handleDelete = () => {
        if (!id) return;
        deleteExercise(id, {
            onSuccess: () => {
                router.push('/audit/exercises');
            },
            onError: (error) => {
                console.error("Failed to delete exercise:", error);
                alert("Failed to delete exercise. Please try again.");
            }
        });
    };

    const handleBack = () => {
        router.push('/audit/exercises');
    };

    if (isLoadingExercise) {
        return (
            <main className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-lg">Loading exercise...</p>
            </main>
        );
    }

    console.log("videoUrl ============== ", videoUrl);

    if (!exercise) {
        return (
            <main className="w-full h-full flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 text-lg">Exercise not found</p>
                <p className="text-sm text-gray-500">ID: {id}</p>
                {exerciseError && (
                    <p className="text-sm text-red-400">Error: {(exerciseError as Error).message}</p>
                )}
                <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-[#1E5598] text-white rounded-full hover:bg-[#15467e]"
                >
                    Back to Exercises
                </button>
            </main>
        );
    }

    return (
        <>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar items-center">
                {showDeleteConfirm ? (
                    // Delete Confirmation
                    <div className="w-full md:w-[90%] lg:w-[80%] bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[30px] flex flex-col items-center justify-center h-full py-10 px-4">
                        <Typography
                            text="Delete Exercise"
                            variant="heading1"
                            style={{ fontWeight: "bold", color: color.warning }}
                            className="text-[32px] md:text-[40px] text-center"
                        />

                        <p className="text-[#0D294D] text-lg md:text-xl text-center max-w-[500px]">
                            Are you sure you want to delete <span className="font-bold text-[#1E5598]">"{exercise.title}"</span>? This action cannot be undone.
                        </p>

                        <div className="flex gap-6">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="px-8 py-3 rounded-full border-2 border-[#1E5598] text-[#1E5598] font-bold text-lg hover:bg-[#1E5598] hover:text-white transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-8 py-3 rounded-full bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ) : (
                    // Video View
                    <div className="w-full md:w-[90%] lg:w-[80%] relative bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[20px] md:gap-[30px] flex flex-col pb-[20px] items-center h-full overflow-y-auto custom-scrollbar">
                        {/* Video Player */}
                        {isLoadingVideo ? (
                            <div className="w-full md:w-[95%] rounded-[36px] aspect-video mt-[20px] bg-gray-200 flex items-center justify-center">
                                <p className="text-gray-500 text-lg">Loading video...</p>
                            </div>
                        ) : videoUrl ? (
                            <video className="w-full md:w-[95%] rounded-[36px] aspect-video mt-[20px]" src={videoUrl as string} controls controlsList="nodownload">
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="w-full md:w-[95%] rounded-[36px] aspect-video mt-[20px] bg-gray-200 flex items-center justify-center">
                                <p className="text-red-500 text-lg">Failed to load video</p>
                            </div>
                        )}

                        {/* Exercise Info */}
                        <div className="w-[90%] flex flex-col gap-4">
                            <h2 className="text-[#0D294D] font-bold text-2xl md:text-3xl">{exercise.title}</h2>

                            {exercise.description && (
                                <p className="text-[#6d7a80] text-lg">{exercise.description}</p>
                            )}

                            <div className="flex flex-wrap gap-4">
                                {exercise.difficultyLevel && (
                                    <div className="flex items-center gap-2">
                                        <p style={{ color: color.secondary }} className="text-[18px] font-bold">Difficulty:</p>
                                        <p style={{ color: color.success }} className="text-[18px] font-bold capitalize">{exercise.difficultyLevel}</p>
                                    </div>
                                )}

                                {exercise.musclesTargeted && exercise.musclesTargeted.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <p style={{ color: color.secondary }} className="text-[18px] font-bold">Muscles:</p>
                                        <p style={{ color: color.success }} className="text-[18px] font-bold">{exercise.musclesTargeted.join(", ")}</p>
                                    </div>
                                )}

                                {exercise.equipmentNeeded && exercise.equipmentNeeded.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <p style={{ color: color.secondary }} className="text-[18px] font-bold">Equipment:</p>
                                        <p style={{ color: color.success }} className="text-[18px] font-bold">{exercise.equipmentNeeded.join(", ")}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row w-[90%] items-center justify-between gap-4 md:gap-0">
                            <h3
                                style={{ color: color.warning, transition: "all 0.3s ease-in-out" }}
                                className="underline font-medium text-[20px] md:text-[25px] cursor-pointer transition duration-300 hover:text-red-600"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Delete Video
                            </h3>

                            <h4
                                onClick={handleBack}
                                style={{ color: color.secondary }}
                                className="text-[20px] md:text-[25px] font-bold cursor-pointer transition hover:opacity-80"
                            >
                                Back to Videos
                            </h4>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default SessionVideo;
