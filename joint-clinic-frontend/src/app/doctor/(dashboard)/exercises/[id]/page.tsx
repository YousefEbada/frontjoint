"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import CustomSelect from "@/components/atoms/CustomSelect";
import DashBoardContent from "@/components/atoms/DashBoardContent";

const PatientExerciseProgressPage = ({ params }: { params: { id: string } }) => {
    const [isCancelling, setIsCancelling] = React.useState(false);
    const cancelReasons = ["Patient improved", "Wrong assignment", "Other"];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                {isCancelling ? (
                    // Cancel View
                    <CorneredBoxes type="shadowBox" className="w-full h-full flex-1 bg-white p-6 md:p-10 flex flex-col items-center justify-center gap-12 overflow-hidden rounded-[30px]">
                        <Typography text="Cancel Patient Exercise" variant="heading2" className="text-[#0D294D] font-bold text-3xl md:text-4xl text-center" />

                        <div className="w-full max-w-[600px] flex flex-col gap-8 items-center">
                            <CustomSelect
                                items={cancelReasons}
                                placeholder="Select Reason"
                                className="w-full"
                                width="100%"
                            />

                            <div className="flex items-center gap-2 text-lg">
                                <span className="text-[#1E5598] font-bold">You are cancelling an exercise for:</span>
                                <span className="text-[#Fdb515] font-bold">Patient Name</span>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-4">
                            <Button
                                text="Cancel"
                                variant="primary"
                                onClick={() => setIsCancelling(false)}
                                className="!w-[160px]"
                            />
                            <Button
                                text="Proceed"
                                variant="primary"
                                className="bg-[#1E5598] !text-white hover:!text-white hover:!bg-[#15467e] !w-[160px]"
                            />
                        </div>
                    </CorneredBoxes>
                ) : (
                    // Progress View
                    <>
                        <div className="flex justify-between items-center">
                            <Typography text="Patient Name" variant="heading2" className="text-[#0D294D] font-bold text-3xl" />
                            <span className="text-[#1C9A55] font-bold text-lg">Active</span>
                        </div>

                        <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                            <div className="flex flex-col gap-6 w-full">
                                <div className="flex justify-between items-start">
                                    <Typography text="Back Injury" variant="heading2" className="text-[#1E5598] font-bold text-2xl" />
                                    <div className="flex flex-col gap-2 items-end">
                                        <Link href={`/doctor/patients/${params.id}`} className="text-[#1E5598] font-bold underline text-sm hover:text-[#15467e]">
                                            View Patient Details
                                        </Link>
                                        <Link href="/doctor/exercises" className="text-[#1E5598] font-bold underline text-sm hover:text-[#15467e]">
                                            Assign New Exercise
                                        </Link>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-4 bg-[#CFE8EA] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#94D0D6] w-2/3 rounded-full"></div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mt-4">
                                    <div className="flex justify-between items-center">
                                        <Typography text="Number Of Exercises:" variant="bodyBold" className="text-[#1E5598]" />
                                        <span className="text-[#1C9A55] font-bold text-xl">16</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Typography text="Exercises completed:" variant="bodyBold" className="text-[#1E5598]" />
                                        <span className="text-[#1C9A55] font-bold text-xl">5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <Typography text="Exercises Assigned" variant="bodyBold" className="text-[#1E5598]" />
                                            <Typography text="By doctor:" variant="bodyBold" className="text-[#1E5598]" />
                                        </div>
                                        <span className="text-[#1C9A55] font-bold text-xl">8</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Typography text="Exercises completed:" variant="bodyBold" className="text-[#1E5598]" />
                                        <span className="text-[#1C9A55] font-bold text-xl">12</span>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-gray-300 my-4"></div>

                                {/* Footer */}
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Typography text="Next Patient Exercise is :" variant="bodyRegular" className="text-[#1E5598] font-medium" />
                                        <span className="text-[#1C9A55] font-bold">Monday, January 2nd 2026 at 8:00 Am</span>
                                    </div>

                                    <Button
                                        text="Cancel"
                                        variant="primary"
                                        onClick={() => setIsCancelling(true)}
                                        className="!px-10 !w-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </DashBoardContent>
        </div>
    );
};

export default PatientExerciseProgressPage;
