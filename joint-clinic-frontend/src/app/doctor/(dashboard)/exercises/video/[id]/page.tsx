"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import CustomSelect from "@/components/atoms/CustomSelect";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import BackTo from "@/components/molecules/BackTo";
// ... imports
import { useExerciseById, useExerciseVideo, useAssignExercise } from "@/hooks/useExercises";
import { usePatientsByDoctor } from "@/hooks/useDoctor";

import { useParams } from "next/navigation";

const ExerciseVideoPage = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id as string;
    const [selectedPatientId, setSelectedPatientId] = useState<string>("");
    const [assignmentSuccess, setAssignmentSuccess] = useState(false);

    // Get doctor ID from local storage
    const [doctorNixpendId, setDoctorNixpendId] = useState<string>("");

    React.useEffect(() => {
        const storedId = localStorage.getItem("doctorNixpendId");
        if (storedId) {
            setDoctorNixpendId(storedId);
        }
    }, []);

    const { data: exercise, isLoading: isLoadingExercise } = useExerciseById(id);
    const { data: videoUrl, isLoading: isLoadingVideo } = useExerciseVideo(id);
    // Use new hook
    const { data: patients, isLoading: isLoadingPatients } = usePatientsByDoctor(doctorNixpendId);
    const { mutate: assignExercise, isPending: isAssigning } = useAssignExercise();

    const patientNames = patients?.map(p => {
        // Handle populated userId object
        if (typeof p.userId === 'object' && p.userId !== null && 'fullName' in p.userId) {
            return (p.userId as any).fullName;
        }
        return "Unknown Name";
    }) || [];

    const handleAssign = () => {
        if (!selectedPatientId) {
            alert("Please select a patient");
            return;
        }

        // Find patient by name from populated user data
        const selectedPatient = patients?.find(p => {
            if (typeof p.userId === 'object' && p.userId !== null && 'fullName' in p.userId) {
                return (p.userId as any).fullName === selectedPatientId;
            }
            return false;
        });

        if (!selectedPatient) {
            alert("Invalid patient selection");
            return;
        }

        if (!doctorNixpendId) {
            alert("Doctor ID not found. Please log in again.");
            return;
        }

        assignExercise({
            patientId: selectedPatient._id,
            exerciseId: id,
            doctorNixpendId: doctorNixpendId,
            numOfReps: 1,
            numOfSets: 1,
            numOfSessions: 1,
        }, {
            onSuccess: () => {
                setAssignmentSuccess(true);
                setTimeout(() => {
                    setAssignmentSuccess(false);
                    setSelectedPatientId("");
                }, 3000);
            },
            onError: (error) => {
                console.error("Failed to assign exercise:", error);
                alert("Failed to assign exercise. Please try again.");
            }
        });
    };

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader
                therapyName={exercise?.title || "Exercise"}
                nav={false}
            />

            <DashBoardContent>
                <CorneredBoxes type="shadowBox" className="w-full h-full flex-1 p-6 md:p-8 custom-scrollbar flex flex-col gap-6 overflow-hidden rounded-[30px] overflow-y-auto items-stretch">
                    {isLoadingExercise ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-lg">Loading exercise...</p>
                        </div>
                    ) : !exercise ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-red-500 text-lg">Exercise not found</p>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row h-full gap-8">
                            <div className="w-full md:w-2/3 h-full min-h-[400px] md:min-h-0 flex flex-col gap-4">
                                {isLoadingVideo ? (
                                    <div className="w-full h-full bg-gray-200 rounded-[20px] flex items-center justify-center">
                                        <p className="text-gray-500 text-lg">Loading video...</p>
                                    </div>
                                ) : videoUrl ? (
                                    <div className="flex flex-col gap-2">
                                        <video
                                            className="w-full h-full rounded-[20px] object-cover"
                                            src={videoUrl}
                                            controls
                                            controlsList="nodownload"
                                            onError={(e) => {
                                                console.error("Video error:", e);
                                                console.error("Video URL:", videoUrl);
                                            }}
                                            onLoadedData={() => {
                                                console.log("Video loaded successfully:", videoUrl);
                                            }}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-[20px] flex items-center justify-center">
                                        <p className="text-red-500 text-lg">Failed to load video</p>
                                    </div>
                                )}

                                {/* Exercise Details */}
                                <div className="flex flex-col gap-2">
                                    <Typography
                                        text={exercise.title}
                                        variant="heading2"
                                        className="text-[#0D294D] font-bold text-2xl"
                                    />
                                    {exercise.description && (
                                        <p className="text-[#6d7a80] text-base">{exercise.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {exercise.difficultyLevel && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#1E5598] font-semibold">Difficulty:</span>
                                                <span className="text-[#1C9A55] font-semibold capitalize">{exercise.difficultyLevel}</span>
                                            </div>
                                        )}
                                        {exercise.musclesTargeted.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#1E5598] font-semibold">Muscles:</span>
                                                <span className="text-[#1C9A55] font-semibold">{exercise.musclesTargeted.join(", ")}</span>
                                            </div>
                                        )}
                                        {exercise.equipmentNeeded.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#1E5598] font-semibold">Equipment:</span>
                                                <span className="text-[#1C9A55] font-semibold">{exercise.equipmentNeeded.join(", ")}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Assign Section */}
                            <div className="w-full md:w-1/3 flex flex-col gap-8">
                                <div className="flex justify-end">
                                    <BackTo text="Videos" href="/doctor/exercises" />
                                </div>

                                <div className="flex flex-col gap-6 mt-4">
                                    <Typography text="Assign Workout" variant="heading2" className="text-[#1C9A55] font-bold text-3xl" />

                                    <div className="flex flex-col gap-4">
                                        {isLoadingPatients ? (
                                            <p className="text-gray-400">Loading patients...</p>
                                        ) : (
                                            <CustomSelect
                                                items={patientNames}
                                                placeholder="Patient Name"
                                                className="w-full"
                                                size="small"
                                                width="100%"
                                                height="60px"
                                                onChange={(value) => setSelectedPatientId(value)}
                                            />
                                        )}

                                        {assignmentSuccess && (
                                            <p className="text-[#1C9A55] font-semibold text-center">
                                                Exercise assigned successfully!
                                            </p>
                                        )}

                                        <div className="mt-8">
                                            <button
                                                className="bg-[#1E5598] text-white font-bold py-3 px-12 rounded-full hover:bg-[#15467e] transition-colors cursor-pointer shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={handleAssign}
                                                disabled={isAssigning || !selectedPatientId}
                                            >
                                                {isAssigning ? "Assigning..." : "Assign"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CorneredBoxes>
            </DashBoardContent>
        </div>
    );
};

export default ExerciseVideoPage;
