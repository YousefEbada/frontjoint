import React from "react";

interface VideoPlayerProps {
    videoId: string;
    className?: string;
    title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, className = "", title = "Exercise Video" }) => {
    return (
        <div className={`relative w-full h-full rounded-[20px] overflow-hidden bg-black ${className}`}>
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default VideoPlayer;
