"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";

// Mock Data
const reports = [
    { id: 1, name: "Week 1 Report", status: "Uploaded", date: "Uploaded Sep 30", downloadable: true },
    { id: 2, name: "Week 2 Report", status: "Uploaded", date: "Uploaded Oct 2nd", downloadable: true },
    { id: 3, name: "Week 3 Report", status: "Waiting", date: "ETA", downloadable: false },
];

const PatientReportsPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <main className="w-full flex-1 flex flex-col gap-6 overflow-hidden p-1">
                <div className="flex items-baseline gap-4">
                    <Typography text="Reports" variant="heading2" className="font-bold text-3xl" gradient={true} />
                    <Typography text="Patient Name" variant="bodyRegular" className="text-[#1C9A55] font-medium text-lg" />
                </div>

                <CorneredBoxes type="shadowBox" className="w-full h-full flex-1 bg-white p-6 md:p-8 flex flex-col gap-4 overflow-hidden rounded-[30px]">
                    <div className="flex flex-col gap-6 w-full overflow-y-auto pr-2">
                        {reports.map((report, index) => (
                            <div key={report.id} className="w-full">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center">
                                        <Typography text={report.name} variant="bodyBold" className="text-[#1E5598] text-lg" />
                                        <span className={`font-bold text-base ${report.status === 'Uploaded' ? 'text-[#1C9A55]' : 'text-[#FDB515]'}`}>
                                            {report.status}
                                        </span>
                                        <span className="text-[#9CA3AF] text-sm md:text-base font-medium">
                                            {report.date}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0">
                                        <button
                                            disabled={!report.downloadable}
                                            className={`px-8 py-2 rounded-full border border-[#1E5598] font-bold transition-all
                                                ${!report.downloadable
                                                    ? 'opacity-30 cursor-not-allowed border-gray-400 text-gray-400'
                                                    : 'text-[#1E5598] hover:bg-[#1E5598] hover:text-white'
                                                }`}
                                        >
                                            View
                                        </button>
                                        <button
                                            disabled={!report.downloadable}
                                            className={`px-8 py-2 rounded-full font-bold transition-all shadow-md
                                                ${!report.downloadable
                                                    ? 'bg-[#9CA3AF] text-white cursor-not-allowed shadow-none'
                                                    : 'bg-[#1E5598] text-white hover:bg-[#15467e] hover:shadow-lg'
                                                }`}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                                {index < reports.length - 1 && <div className="w-full h-[1px] bg-gray-200 mt-2"></div>}
                            </div>
                        ))}
                    </div>
                </CorneredBoxes>
            </main>
        </div>
    );
};

export default PatientReportsPage;
