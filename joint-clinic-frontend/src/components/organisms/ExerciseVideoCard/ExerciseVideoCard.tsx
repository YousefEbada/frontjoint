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
            className={`w-full h-full md:h-auto max-w-[1000px] bg-white p-6 gap-6 items-stretch ${className}`}
        >
            {/* Video Player */}
            <div className="relative w-full aspect-video h-full rounded-[20px] overflow-hidden">
                <VideoPlayer videoId={videoId} />

                {/* Overlay Title - Could be a molecule if reused */}
                <div className="absolute top-6 left-6 pointer-events-none">
                    <Typography text="Session Number 3" variant="heading2" className="text-white drop-shadow-md" />
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="grid grid-cols-1 h-full md:h-auto md:grid-cols-4 gap-4 px-2 mt-4">
                <div className=" row-start-4 md:row-start-auto flex items-end justify-center md:h-auto h-full">
                    <Button
                        text="Mark Complete"
                        variant="fourth"
                        className="w-auto! px-6! py-2! text-[16px]!"
                        onClick={onMarkComplete}
                    />
                </div>
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 ">
                    <div className="flex gap-2 justify-start md:justify-center">
                        <ExerciseStats label="Number of Sets:" value={sets} />
                    </div>

                    <div className="flex gap-2 justify-start md:justify-center">
                        <ExerciseStats label="Number of Reps:" value={reps} />
                    </div>
                </div>

                <BackLink href="/patient/exercises" text="Back to Videos" className="row-start-1 md:row-start-auto justify-self-end" />
            </div>
        </CorneredBoxes>
    );
};

export default ExerciseVideoCard;
