"use client";
import React from "react";
import SessionCard from "@/components/molecules/sessionCard";

interface Exercise {
    id: number | string;
    imageSrc: string;
    title: string;
    status?: string;
    minutes?: number;
}

interface ExerciseGridProps {
    exercises: Exercise[];
    className?: string;
    onExerciseClick?: (id: string) => void;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({ exercises, className = "", onExerciseClick }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full ${className}`}>
            {exercises.map((exercise) => (
                <div
                    key={exercise.id}
                    onClick={() => onExerciseClick && onExerciseClick(String(exercise.id))}
                    className={onExerciseClick ? "cursor-pointer" : ""}
                >
                    <SessionCard
                        id={exercise.id}
                        imageSrc={exercise.imageSrc}
                        title={exercise.title}
                        status={exercise.status}
                        minutes={exercise.minutes}
                        className="w-full"
                    />
                </div>
            ))}
        </div>
    );
};

export default ExerciseGrid;
