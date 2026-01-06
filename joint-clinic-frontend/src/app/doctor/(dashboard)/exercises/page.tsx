"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import SessionCard from "@/components/molecules/sessionCard";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import SearchInput from "@/components/atoms/searchInput";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import PatientCard from "@/components/molecules/PatientCard";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useExercises } from "@/hooks/useExercises";
import { useDoctorPatients } from "@/hooks/useDoctor";

// Fallback images if none provided
const DEFAULT_EXERCISE_IMG = "/sessionCard.png";

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState<"find" | "progress">("find");
    const [searchTerm, setSearchTerm] = useState("");

    // TODO: Replace with actual logged-in doctor ID
    const doctorId = "HLC-PRAC-2022-00001";

    const { data: exercises, isLoading: isLoadingExercises } = useExercises();
    const { data: patients, isLoading: isLoadingPatients } = useDoctorPatients(doctorId, 'active');

    const filteredPatients = patients?.filter(p =>
        p.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false}>
                <div className="flex gap-8">
                    <div onClick={() => setActiveTab("find")} className="cursor-pointer">
                        <Typography
                            text="Find Exercises"
                            variant="bodyRegular"
                            className={`${activeTab === "find" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
                        />
                    </div>
                    <div onClick={() => setActiveTab("progress")} className="cursor-pointer">
                        <Typography
                            text="Patient Progress"
                            variant="bodyRegular"
                            className={`${activeTab === "progress" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
                        />
                    </div>
                </div>
            </DashBoardHeader>

            <DashBoardContent>
                {activeTab === "find" ? (
                    /* Find Exercises View */
                    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar px-1">
                        <div className="flex flex-col gap-1">
                            <Typography
                                text="Exercises Library"
                                variant="heading2"
                                className="text-[#1E5598] font-bold text-[32px]"
                            />
                            <Typography
                                text="Manage and assign exercises to your patients"
                                variant="bodyRegular"
                                className="text-gray-400"
                            />
                        </div>

                        {isLoadingExercises ? (
                            <div className="text-center py-10 text-gray-400">Loading exercises...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pb-8">
                                {exercises?.map((exercise) => (
                                    <Link key={exercise._id} href={`/doctor/exercises/video/${exercise._id}`} className="w-full">
                                        <SessionCard
                                            id={exercise._id}
                                            imageSrc="/sessionCard.png" // Placeholder image
                                            title={exercise.title}
                                            status={exercise.difficultyLevel ? exercise.difficultyLevel.charAt(0).toUpperCase() + exercise.difficultyLevel.slice(1) : "Available"}
                                            className="w-full"
                                            noLink={true}
                                        />
                                    </Link>
                                ))}
                                {exercises?.length === 0 && (
                                    <div className="col-span-full text-center py-10 text-gray-400">No exercises found.</div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Patient Progress View */
                    <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <Typography
                                text="Active Patients"
                                variant="heading2"
                                className=" self-start font-bold text-3xl"
                                gradient={true}
                            />

                            <div className="w-full md:w-[300px]">
                                <SearchInput
                                    placeholder="Search By patient"
                                    value={searchTerm}
                                    onChange={(value) => setSearchTerm(value)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                            <ScrollableArea className="w-full h-full px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                                    {isLoadingPatients ? (
                                        <div className="col-span-full text-center py-10 text-gray-400">Loading patients...</div>
                                    ) : filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <Link key={patient._id} href={`/doctor/exercises/${patient._id}`} className="w-full">
                                                <PatientCard
                                                    name={patient.fullName}
                                                    injury={patient.condition || "No specified injury"}
                                                    status={patient.status === 'active' ? "Active" : "Inactive"}
                                                    statusColor={patient.status === 'active' ? "text-[#1C9A55]" : "text-[#8A8A8A]"}
                                                />
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-full flex items-center justify-center text-gray-400 h-40">
                                            No patients found.
                                        </div>
                                    )}
                                </div>
                            </ScrollableArea>
                        </div>
                    </div>
                )}
            </DashBoardContent>
        </div>
    );
};

export default ExercisesPage;
