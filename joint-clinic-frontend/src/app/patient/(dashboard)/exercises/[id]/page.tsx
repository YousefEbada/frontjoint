"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";
import { useExerciseById, useExerciseVideo } from "@/hooks/useExercises";
import { useParams, useRouter } from "next/navigation";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import BackTo from "@/components/molecules/BackTo";

const VideoPage = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id as string;
    const router = useRouter();

    const { data: exercise, isLoading: isLoadingExercise, error: exerciseError } = useExerciseById(id);
    const { data: videoUrl, isLoading: isLoadingVideo } = useExerciseVideo(id);

    const handleBack = () => {
        router.back();
    };

    if (isLoadingExercise) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-lg">Loading exercise...</p>
            </div>
        );
    }

    if (!exercise) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <p className="text-red-500 text-lg">Exercise not found</p>
                <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-[#1E5598] text-white rounded-full hover:bg-[#15467e]"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 w-full h-full p-4 md:p-8 overflow-hidden">
                <CorneredBoxes type="shadowBox" className="w-full h-full bg-[#fff] flex-1 p-6 md:p-8 custom-scrollbar flex flex-col gap-6 overflow-y-auto items-stretch rounded-[30px]">
                    <div className="w-full h-full flex flex-col items-center">
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
                        <div className="w-[90%] flex flex-col gap-4 mt-8">
                            <h2 className="text-[#0D294D] font-bold text-2xl md:text-3xl">{exercise.title}</h2>

                            {exercise.description && (
                                <p className="text-[#6d7a80] text-lg">{exercise.description}</p>
                            )}

                            <div className="flex flex-wrap gap-4 mt-4">
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
                        <div className="flex flex-col md:flex-row w-[90%] items-center justify-end gap-4 md:gap-0 mt-8 mb-8">
                            <h4
                                onClick={handleBack}
                                style={{ color: color.secondary }}
                                className="text-[20px] md:text-[25px] font-bold cursor-pointer transition hover:opacity-80"
                            >
                                Back to Exercises
                            </h4>
                        </div>
                    </div>
                </CorneredBoxes>
            </div>
        </div>
    );
};

export default VideoPage;
