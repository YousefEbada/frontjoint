import React from "react";
import SearchInput from "@/components/atoms/searchInput";
import Typography from "@/components/atoms/Typography";
import ScrollableArea from "../atoms/ScrollableArea";

interface PatientSnippet {
    id: number;
    name: string;
    time: string;
    snippet: string;
    active: boolean;
    dotColor: string;
}

interface ChatSidebarProps {
    patients: PatientSnippet[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSelectPatient: (id: number) => void;
    activePatientId: number | null;
    className?: string; // For responsive visibility control
}

const ChatSidebar = ({ patients, searchTerm, onSearchChange, onSelectPatient, activePatientId, className = "" }: ChatSidebarProps) => {
    return (
        <div className={`flex flex-col p-6 gap-6 h-full min-h-0 overflow-hidden ${className}`}>
            <SearchInput
                placeholder="Search By patient"
                value={searchTerm}
                onChange={onSearchChange}
            />

            <ScrollableArea className="flex-1 flex flex-col gap-4 pr-2">
                {patients.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => onSelectPatient(p.id)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border-l-4 ${activePatientId === p.id
                            ? "bg-[#EAF6F8] border-[#0A1C32]"
                            : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200 border"
                            }`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${p.dotColor}`}></div>
                                <Typography text={p.name} variant="bodyBold" className="text-[#1E5598]" />
                            </div>
                            <span className="text-xs text-[#1E5598] font-bold">{p.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {p.snippet}
                        </p>
                    </div>
                ))}
            </ScrollableArea>
        </div>
    );
};

export default ChatSidebar;
