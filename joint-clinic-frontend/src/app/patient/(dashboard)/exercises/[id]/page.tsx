"use client";

import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import React from "react";
import ExerciseDetailTemplate from "@/components/templates/ExerciseDetailTemplate";
import ExerciseVideoCard from "@/components/organisms/ExerciseVideoCard/ExerciseVideoCard";

interface VideoPageProps {
    params: {
        id: string;
    };
}

const VideoPage = ({ params }: VideoPageProps) => {
    // Mock data retrieval based on ID (in real app, fetch from API)
    const { id } = params;

    // Placeholder video ID
    const safeVideoId = "lHHTiG5X_yE";

    return (
        <ExerciseDetailTemplate
            header={<DashBoardHeader therapyName={data.therapyName} nav={false} />}
            content={
                <ExerciseVideoCard
                    videoId={safeVideoId}
                    sets={3}
                    reps={15}
                />
            }
        />
    );
};

export default VideoPage;
