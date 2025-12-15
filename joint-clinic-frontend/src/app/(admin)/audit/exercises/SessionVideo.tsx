"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import CustomSelect from "@/components/atoms/CustomSelect";
import { color } from "@/lib/constants/colors";
import Button from "@/components/atoms/Button";



const SessionVideo = () => {

    return (
        <>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar">
                {/* Welcome Section */}
                <div className="w-full relative bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[30px] flex flex-col pb-[20px] items-center h-full overflow-y-auto custom-scrollbar">
                    <iframe className="w-[95%] rounded-[36px] h-[90%] mt-[20px]" src="https://www.youtube.com/embed/FOF71Lb5SkA?si=52yCXmfNaW67BqL9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="flex w-[90%] flex-row items-center justify-between">
                        {/* hover inline style*/}
                        <h3 style={{ color: color.warning, transition: "all 0.3s ease-in-out" }} className="underline font-medium text-[25px] cursor-pointer transition duration-300 hover:text-[#1e5598]">Delete Video</h3>
                        <p style={{ color: color.secondary, fontSize: "20px" }} className="font-bold">Workout Type:</p>
                        <p style={{ color: color.success, fontSize: "20px" }} className="font-bold">Shoulders</p>
                        <h4 style={{ color: color.secondary, fontSize: "25px" }} className="font-bold cursor-pointer transition">Back to Videos</h4>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SessionVideo;
