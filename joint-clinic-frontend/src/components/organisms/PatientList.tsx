"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import PatientRow from "@/components/atoms/PatientRow";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";

const PatientList = () => {
    // Mock data
    const patients = [
        { id: 1, name: "Roger Korsgaard", status: "Active", date: "Oct 21, 2025" },
        { id: 2, name: "Roger Korsgaard", status: "Active", date: "Oct 21, 2025" },
        { id: 3, name: "Roger Korsgaard", status: "Inactive", statusColor: "text-red-500", date: "Oct 21, 2025" },
        { id: 4, name: "Roger Korsgaard", status: "Active", date: "Oct 21, 2025" },
    ];

    return (
        <CorneredBoxes type="shadowBox" className="w-full bg-white p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
                <Typography text="Recent Patients" variant="bodyBold" className="text-[#1E5598] font-bold text-xl" />
                <button className="text-[#1E5598] text-sm font-medium hover:underline">View All</button>
            </div>

            <div className="flex flex-col w-full">
                {/* Header Row - Optional using grid similar to PatientRow if needed, or just list */}
                <div className="grid grid-cols-4 px-3 py-2 text-[#8A8A8A] font-medium text-lg border-b border-gray-100 mb-2">
                    <span>Patient Name</span>
                    <span className="text-center">Status</span>
                    <span className="text-center">Appointment Date</span>
                    <span className="text-end">Action</span>
                </div>

                {patients.map((patient) => (
                    <div key={patient.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <PatientRow
                            name={patient.name}
                            status={patient.status}
                            statusColor={patient.statusColor}
                            date={patient.date}
                            onDetailsClick={() => console.log("Details clicked")}
                        />
                    </div>
                ))}
            </div>
        </CorneredBoxes>
    );
};

export default PatientList;
