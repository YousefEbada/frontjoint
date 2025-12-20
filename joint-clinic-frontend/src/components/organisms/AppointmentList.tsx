import React from "react";
import Typography from "@/components/atoms/Typography";
import AppointmentItem from "@/components/molecules/AppointmentItem";

interface Appointment {
    id: number;
    name: string;
    status: string;
    date: string;
    statusColor?: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
    return (
        <section className="flex flex-col gap-6 h-full">
            <Typography
                text="Today’s appointments"
                variant="heading2"
                className="text-[#1E5598] font-bold text-2xl"
            />

            <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                {appointments.map((apt) => (
                    <div key={apt.id}>
                        <AppointmentItem
                            name={apt.name}
                            status={apt.status}
                            date={apt.date}
                            statusColor={apt.statusColor}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AppointmentList;
