"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import SessionCard from "@/components/molecules/sessionCard";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import SearchInput from "@/components/atoms/searchInput";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import PatientCard from "@/components/molecules/PatientCard";
import Link from "next/link";

interface Exercise {
    id: number;
    imageSrc: string;
    title: string;
    status?: string;
    minutes?: number;
}

const exercisesLibrary: Exercise[] = [
    {
        id: 1,
        imageSrc: "/sessionCard.png",
        title: "Shoulder Rehab",
        minutes: 15,
        status: "In Progress",
    },
    {
        id: 2,
        imageSrc: "/sessionCard.png",
        title: "Knee Stimulation",
        minutes: 20,
        status: "Completed",
    },
    {
        id: 3,
        imageSrc: "/sessionCard.png",
        title: "Back Strengthening",
        minutes: 30,
        status: "Pending",
    },
    {
        id: 4,
        imageSrc: "/sessionCard.png",
        title: "Leg Exercises",
        minutes: 10,
        status: "Pending",
    }
];

// Mock Data for Patients (Progress View)
const progressPatients = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Patient Name",
    injury: "Back injury",
    status: "Active",
    statusColor: "text-[#1C9A55]"
}));

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState<"find" | "progress">("find");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = progressPatients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            <main className="w-full flex-1 flex flex-col gap-6 overflow-hidden p-1">
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pb-8">
                            {exercisesLibrary.map((exercise) => (
                                <Link key={exercise.id} href={`/doctor/exercises/video/${exercise.id}`} className="w-full">
                                    <SessionCard
                                        id={exercise.id}
                                        imageSrc={exercise.imageSrc}
                                        title={exercise.title}
                                        status={exercise.status}
                                        minutes={exercise.minutes}
                                        className="w-full"
                                        noLink={true}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Patient Progress View */
                    <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <Typography
                                text="Active Patients"
                                variant="heading2"
                                className="font-bold text-3xl"
                                gradient={true}
                            />

                            <div className="w-full md:w-[300px]">
                                <SearchInput
                                    placeholder="Search By patient"
                                    value={searchTerm}
                                    onChange={(value) => setSearchTerm(value)}
                                />
                            </div>
                        </div>

                        <CorneredBoxes type="shadowBox" className="w-full h-full flex-1 bg-white p-6 flex flex-col gap-4 overflow-hidden">
                            <ScrollableArea className="w-full h-full px-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                                    {filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <Link key={patient.id} href={`/doctor/exercises/${patient.id}`} className="w-full">
                                                <PatientCard
                                                    name={patient.name}
                                                    injury={patient.injury}
                                                    status={patient.status}
                                                    statusColor={patient.statusColor}
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
                        </CorneredBoxes>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExercisesPage;
