"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import VideoPlayer from "@/components/organisms/VideoPlayer/VideoPlayer";
import CustomSelect from "@/components/atoms/CustomSelect";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import BackTo from "@/components/molecules/BackTo";

// Mock Patients for Dropdown
const patients = ["Patient 1", "Patient 2", "Patient 3", "Patient 4"];

const ExerciseVideoPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="Shoulder Therapy" nav={false} />

            <DashBoardContent>
                <CorneredBoxes type="shadowBox" className="w-full h-full flex-1 bg-white p-6 md:p-8 flex flex-col gap-6 overflow-hidden rounded-[30px] items-stretch">
                    <div className="flex flex-col md:flex-row h-full gap-8">
                        {/* Video Section */}
                        <div className="w-full md:w-2/3 h-full min-h-[400px] md:min-h-0">
                            <VideoPlayer videoId="M7lc1UVf-VE" title="Shoulder Therapy Video" className="rounded-[20px]" />
                        </div>

                        {/* Assign Section */}
                        <div className="w-full md:w-1/3 flex flex-col gap-8">
                            <div className="flex justify-end">
                                <BackTo text="Videos" href="/doctor/exercises" />
                            </div>

                            <div className="flex flex-col gap-6 mt-4">
                                <Typography text="Assign Workout" variant="heading2" className="text-[#1C9A55] font-bold text-3xl" />

                                <div className="flex flex-col gap-4">
                                    <CustomSelect
                                        items={patients}
                                        placeholder="Patient Name"
                                        className="w-full"
                                        size="small"
                                        width="100%"
                                        height="60px"
                                    />

                                    <div className="mt-8">
                                        {/* Spacer to push button down or just margin */}
                                        <button className="bg-[#1E5598] text-white font-bold py-3 px-12 rounded-full hover:bg-[#15467e] transition-colors shadow-lg text-lg">
                                            Assign
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CorneredBoxes>
            </DashBoardContent>
        </div>
    );
};

export default ExerciseVideoPage;
