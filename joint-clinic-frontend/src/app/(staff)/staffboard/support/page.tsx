"use client";
import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import ContactForm from "@/components/organisms/ContactForm";
import RequestDoctorHelp from "@/components/organisms/RequestDoctorHelp";

const SupportPage = () => {
    const [activeTab, setActiveTab] = useState<'call' | 'doctor'>('call');

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <div className="flex gap-8 cursor-pointer">
                    <div onClick={() => setActiveTab('call')}>
                        <Typography
                            text="Request call"
                            variant="bodyRegular"
                            className={`font-medium transition-colors ${activeTab === 'call' ? 'text-[#1E5598]' : 'text-[#9CA3AF]'}`}
                        />
                    </div>
                    <div onClick={() => setActiveTab('doctor')}>
                        <Typography
                            text="Request doctor help"
                            variant="bodyRegular"
                            className={`font-medium transition-colors ${activeTab === 'doctor' ? 'text-[#1E5598]' : 'text-[#9CA3AF]'}`}
                        />
                    </div>
                </div>
            </DashBoardHeader>
            <main className="w-full h-full flex flex-col gap-8 p-4 md:p-8">
                {activeTab === 'call' ? (
                    <>
                        <Typography text="Request Contact" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />
                        <ContactForm />
                    </>
                ) : (
                    <RequestDoctorHelp />
                )}
            </main>
        </>
    );
};

export default SupportPage;
