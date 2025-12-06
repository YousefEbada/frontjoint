"use client";
import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import ContactForm from "@/components/organisms/ContactForm";
import RequestDoctorHelp from "@/components/organisms/RequestDoctorHelp";
import Button from '@/components/atoms/button';
import RequestItem from '@/components/atoms/RequestItem';

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

        <>
          <Typography text="Call Requests" variant="heading2" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent font-bold mb-2 pl-[30px]" />
          <div className="w-full bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] p-5 overflow-y-auto custom-scrollbar">
            <RequestItem name="John Doe" status="Done" phone="123-456-7890" department="Cardiology" date="Oct 12th 2025 at 3:00 Pm"/>
            <RequestItem name="John Doe" status="Opened" phone="123-456-7890" department="Cardiology" date="Oct 12th 2025 at 3:00 Pm"/>
            <RequestItem name="John Doe" status="Done" phone="123-456-7890" department="Cardiology" date="Oct 12th 2025 at 3:00 Pm"/>
            <RequestItem name="John Doe" status="Opened" phone="123-456-7890" department="Cardiology" date="Oct 12th 2025 at 3:00 Pm"/>
            <RequestItem name="John Doe" status="Unread" phone="123-456-7890" department="Cardiology" date="Oct 12th 2025 at 3:00 Pm"/>
          </div>
        </>

      </main>
    </>
  );
};

export default SupportPage;
