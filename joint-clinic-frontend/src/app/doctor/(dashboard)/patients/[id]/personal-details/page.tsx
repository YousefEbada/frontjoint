"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { usePatient } from "@/hooks/usePatient";

const PersonalDetailsPage = ({ params }: any) => {
    const {id} = React.use(params) as any
    const { data: patientData, isLoading } = usePatient(id);

    const formatDob = (value?: string) => {
        if (!value) return "N/A";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "N/A";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const patient = {
        name: (patientData?.userId as any)?.fullName || "Patient Name",
        identifier: (patientData?.userId as any)?.identifier || "N/A",
        status: patientData?.status === 'active' ? "Active" : "Inactive",
        statusColor: patientData?.status === 'active' ? "text-[#1C9A55]" : "text-[#8A8A8A]",
        gender: (patientData?.userId as any)?.gender || "N/A",
        dob: formatDob((patientData?.userId as any)?.birthdate),
        personalDetails: {
            email: patientData?.personalDetails?.email || "N/A",
            nationality: patientData?.personalDetails?.nationality || "N/A",
            maritalStatus: patientData?.personalDetails?.maritalStatus || "N/A",
            identifierType: patientData?.personalDetails?.identifierType || "N/A",
            address: patientData?.personalDetails?.address || "N/A",
            city: patientData?.personalDetails?.city || "N/A",
            speakingLanguage: patientData?.personalDetails?.speakingLanguage || "N/A",
        }
    };

    if (isLoading) {
        return <div className="text-center py-20">Loading personal details...</div>;
    }

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                {/* Header Information Box */}
                <div className="w-full flex-1 overflow-y-auto overflow-x-visible custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                    <div className="flex flex-col sm:flex-row w-full justify-between">
                        <div className="flex flex-col gap-1 w-fit">
                            <Typography text={patient.name} variant="heading2" className="text-[#1E5598] font-bold text-3xl" />
                            <Typography text="National Id / Iqama" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.identifier} variant="bodyRegular" className="text-[#1C9A55] font-bold" />
                        </div>

                        <div className="flex flex-col gap-1 w-full md:w-fit items-end pt-2">
                            <div className="flex gap-12 w-full justify-between">
                                <Typography text="Status:" variant="bodyBold" className="text-[#1E5598] font-bold" />
                                <span className={`${patient.statusColor} font-bold`}>{patient.status}</span>
                            </div>
                            <div className="flex gap-12 w-full justify-between">
                                <Typography text="Patient Gender:" variant="bodyBold" className="text-[#1E5598] font-bold" />
                                <span className="text-[#1C9A55] font-bold">{patient.gender}</span>
                            </div>
                            <div className="flex gap-12 w-full justify-between">
                                <Typography text="Patient DOB:" variant="bodyBold" className="text-[#1E5598] font-bold" />
                                <span className="text-[#1C9A55] font-bold">{patient.dob}</span>
                            </div>
                        </div>
                    </div>


                    {/* Two Column Layout */}
                    <div className="flex flex-col md:flex-row gap-6 w-full h-full flex-1 overflow-hidden pb-4">

                        {/* Left Card: Personal Details */}
                        <CorneredBoxes type="shadowBox" className="flex-1 bg-white p-8 rounded-[30px] h-full w-full shadow-sm! flex flex-col relative">
                            <Typography text="Personal Details" variant="subheader" className="text-[#167C4F] font-bold mb-6" /> {/* Green title as per image */}

                            <div className="flex flex-col gap-4 flex-1">
                                <DetailRow label="Email Address" value={patient.personalDetails.email} />
                                <DetailRow label="Nationality" value={patient.personalDetails.nationality} />
                                <DetailRow label="Marital Status" value={patient.personalDetails.maritalStatus} />
                                <DetailRow label="Identifier Type" value={patient.personalDetails.identifierType} />
                                <DetailRow label="Address" value={patient.personalDetails.address} />
                                <DetailRow label="City" value={patient.personalDetails.city} />
                                <DetailRow label="Speaking Language" value={patient.personalDetails.speakingLanguage} />
                            </div>

                            {/* Paginator Dots (Visual only for now) */}
                            <div className="flex justify-center gap-2 mt-4 absolute bottom-6 w-full left-0">
                                <div className="w-3 h-3 rounded-full bg-[#1E5598]"></div>
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            </div>
                        </CorneredBoxes>

                        {/* Right Card: Diagnosis */}
                        <CorneredBoxes type="shadowBox" className="flex-1 bg-white p-8 rounded-[30px] h-full w-full shadow-sm flex flex-col relative">
                            <Typography text="Diagnosis" variant="subheader" className="text-[#167C4F] font-bold mb-6" />

                            <div className="flex-1">
                                {/* Content area is empty in image */}
                                {patientData?.condition && (
                                    <Typography text={patientData.condition} variant="bodyRegular" className="text-[#1C9A55]" />
                                )}
                            </div>

                            {/* Back Button */}
                            <div className="flex justify-center md:justify-end w-full mt-auto">
                                <Link href={`/doctor/patients/${id}`}>
                                    <button className="border border-[#1E5598] text-[#1E5598] rounded-full px-8 py-2 font-bold hover:bg-[#1E5598] hover:text-white transition-colors md:self-end">
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </CorneredBoxes>
                    </div>
                </div>
            </DashBoardContent>
        </div>
    );
};

// Helper component for detail rows
const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center w-full">
        <Typography text={label} variant="bodyBold" className="text-[#1E5598] font-bold" />
        <Typography text={value} variant="bodyRegular" className="text-[#1C9A55] font-bold text-right" />
    </div>
);

export default PersonalDetailsPage;
