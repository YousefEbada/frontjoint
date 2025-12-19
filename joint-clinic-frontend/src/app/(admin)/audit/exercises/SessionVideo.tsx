"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import CustomSelect from "@/components/atoms/CustomSelect";
import { color } from "@/lib/constants/colors";
import Button from "@/components/atoms/Button";



interface SessionVideoProps {
    onClose: () => void;
}

const SessionVideo = ({ onClose }: SessionVideoProps) => {

    return (
        <>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar items-center">
                {/* Welcome Section */}
                <div className="w-full md:w-[90%] lg:w-[80%] relative bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[20px] md:gap-[30px] flex flex-col pb-[20px] items-center h-full overflow-y-auto custom-scrollbar">
                    <iframe
                        className="w-full md:w-[95%] rounded-[36px] aspect-video mt-[20px]"
                        src="https://www.youtube.com/embed/FOF71Lb5SkA?si=52yCXmfNaW67BqL9"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>

                    <div className="flex flex-col md:flex-row w-[90%] items-center justify-between gap-4 md:gap-0">
                        {/* hover inline style*/}
                        <h3 style={{ color: color.warning, transition: "all 0.3s ease-in-out" }} className="underline font-medium text-[20px] md:text-[25px] cursor-pointer transition duration-300 hover:text-[#1e5598]">Delete Video</h3>

                        <div className="flex items-center gap-2">
                            <p style={{ color: color.secondary }} className="text-[18px] md:text-[20px] font-bold">Workout Type:</p>
                            <p style={{ color: color.success }} className="text-[18px] md:text-[20px] font-bold">Shoulders</p>
                        </div>

                        <h4
                            onClick={onClose}
                            style={{ color: color.secondary }}
                            className="text-[20px] md:text-[25px] font-bold cursor-pointer transition hover:opacity-80"
                        >
                            Back to Videos
                        </h4>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SessionVideo;
