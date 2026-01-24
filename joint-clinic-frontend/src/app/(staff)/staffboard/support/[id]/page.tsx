"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Typography from '@/components/atoms/Typography';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import ContactForm from "@/components/organisms/ContactForm";
import RequestDoctorHelp from "@/components/organisms/RequestDoctorHelp";
import DashBoardContent from '@/components/atoms/DashBoardContent';
import { useSupportTicket, useSupportTickets } from "@/hooks/useSupport";

const SupportPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const [activeTab, setActiveTab] = useState<'call' | 'doctor'>('call');

    // Use the single ticket hook
    const { ticket, isLoading } = useSupportTicket(id);
    // Use the list hook just for the update status function (or we could export it separately)
    const { updateStatus } = useSupportTickets();

    const handleMarkCompleted = async () => {
        if (id) {
            await updateStatus(id, "Done"); // Assuming "Done" is the status for completed
            router.push('/staffboard/support');
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;

    const initialValues = ticket ? {
        contact: ticket.contact,
        inquiryDept: ticket.inquiryDept,
        whenToCall: ticket.whenToCall ? new Date(ticket.whenToCall).toLocaleString() : "",
        message: ticket.message
    } : undefined;

    return (
        <>
            <DashBoardHeader therapyName="Request Details">
            </DashBoardHeader>
            <DashBoardContent>
                {activeTab === 'call' ? (
                    <>
                        <Typography text="Request Details" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />
                        {ticket && (
                            <ContactForm
                                buttonText="Mark Completed"
                                initialValues={initialValues}
                                readOnly={true}
                                onSubmit={handleMarkCompleted}
                            />
                        )}
                    </>
                ) : (
                    <RequestDoctorHelp />
                )}
            </DashBoardContent>
        </>
    );
};

export default SupportPage;