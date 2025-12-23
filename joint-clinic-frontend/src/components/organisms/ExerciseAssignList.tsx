"use client";

import React from "react";
import Typography from "@/components/atoms/Typography";
import ExerciseAssignItem from "@/components/molecules/ExerciseAssignItem";

interface Assign {
    id: number;
    name: string;
    injury: string;
    due: string;
    dueColor?: string;
    isRead?: boolean;
}

interface ExerciseAssignListProps {
    assigns: Assign[];
}

const ExerciseAssignList = ({ assigns }: ExerciseAssignListProps) => {
    return (
        <section className="flex flex-col gap-6 h-full">
            <Typography
                text="Exercise Assigns"
                variant="heading2"
                className="text-[#1E5598] font-bold text-2xl"
            />

            <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                {assigns.map((assign) => (
                    <div key={assign.id}>
                        <ExerciseAssignItem
                            name={assign.name}
                            injury={assign.injury}
                            due={assign.due}
                            dueColor={assign.dueColor}
                            isRead={assign.isRead}
                            onAssign={() => console.log(`Assigned to ${assign.name}`)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExerciseAssignList;
