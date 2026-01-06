"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams hook
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import ChatInterface from "@/components/organisms/ChatInterface";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";

const DoctorChatPage = () => {
    const params = useParams(); // params might be string or array
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    
    // We need the doctor's userId to identify 'my' messages
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // Try to get userId or doctorId
        const stored = localStorage.getItem('userId') || localStorage.getItem('doctorId');
        if (stored) setUserId(stored);
    }, []);

    // If param is missing?
    if (!id) return <div>Invalid Chat ID</div>;

    return (
         <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <div className="flex flex-col h-full gap-4">
                     <div className="flex items-center gap-2 mb-2">
                        <Link href="/doctor/support" className="text-gray-400 hover:text-[#1E5598] transition-colors">
                             <Typography text="← Back to Messages" variant="bodyRegular" />
                        </Link>
                    </div>

                    <div className="flex-1 min-h-0">
                         {/* We pass the room ID to ChatInterface */}
                         <ChatInterface 
                            roomId={id} 
                            userId={userId} 
                            userType="doctor" 
                            title="Patient Chat"
                        />
                    </div>
                </div>
            </DashBoardContent>
        </div>
    );
};

export default DoctorChatPage;
