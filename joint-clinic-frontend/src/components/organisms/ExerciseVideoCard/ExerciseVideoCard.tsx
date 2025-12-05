"use client";
import React from "react";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import VideoPlayer from "@/components/organisms/VideoPlayer/VideoPlayer";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import ExerciseStats from "@/components/molecules/ExerciseStats";
import BackLink from "@/components/molecules/BackLink";

interface ExerciseVideoCardProps {
    videoId: string;
    sets: number | string;
    reps: number | string;
    className?: string;
    onMarkComplete?: () => void;
}

const ExerciseVideoCard: React.FC<ExerciseVideoCardProps> = ({ videoId, sets, reps, className = "", onMarkComplete }) => {
    return (
        <CorneredBoxes
            type="shadowBox"
            className={`w-full max-w-[1000px] bg-white p-6 gap-6 items-stretch ${className}`}
        >
            {/* Video Player */}
            <div className="relative w-full aspect-video rounded-[20px] overflow-hidden">
                <VideoPlayer videoId={videoId} />

                {/* Overlay Title - Could be a molecule if reused */}
                <div className="absolute top-6 left-6 pointer-events-none">
                    <Typography text="Session Number 3" variant="heading2" className="text-white drop-shadow-md" />
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2 mt-4">
                <div className="flex flex-row gap-6 items-center flex-wrap justify-center md:justify-start">
                    <Button
                        text="Mark Complete"
                        variant="fourth"
                        className="w-auto! px-6! py-2! text-[16px]!"
                        onClick={onMarkComplete}
                    />

                    <div className="flex gap-2 items-center">
                        <ExerciseStats label="Number of Sets:" value={sets} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <ExerciseStats label="Number of Reps:" value={reps} />
                    </div>
                </div>

                <BackLink href="/dashboard/exercises" text="Back to Videos" />
            </div>
        </CorneredBoxes>
    );
};

export default ExerciseVideoCard;
