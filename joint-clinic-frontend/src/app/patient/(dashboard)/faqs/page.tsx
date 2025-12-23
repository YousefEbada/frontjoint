"use client";
import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import Accordion from '@/components/organisms/Accordion';
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import SearchInput from '@/components/atoms/searchInput';
import DashBoardContent from '@/components/atoms/DashBoardContent';

const faqsData = {
    "Appointments & Scheduling": [
        {
            question: "How can I book my first physiotherapy session?",
            answer: "You can book your first session by navigating to the 'Book Appointment' section in your dashboard. Select your preferred doctor, date, and time, then confirm your booking."
        },
        {
            question: "Can I reschedule or cancel my appointment online?",
            answer: "Yes, you can reschedule or cancel your appointment from the 'My Bookings' section. Please note that cancellations must be made at least 24 hours in advance."
        },
        {
            question: "What happens if I miss a session?",
            answer: "If you miss a session without prior notice, it may be counted as a used session. Please contact support if you have an emergency."
        },
        {
            question: "How do I know which doctor I’m assigned to?",
            answer: "Your assigned doctor is listed in your dashboard under 'My Care Team' or in your appointment details."
        },
        {
            question: "Can I choose a specific physiotherapist?",
            answer: "Yes, during the booking process, you can view the profiles of available physiotherapists and choose the one you prefer."
        }
    ],
    "Medical Reports & Records": [
        {
            question: "Where can I find my previous reports and prescriptions?",
            answer: "All your medical reports and prescriptions are stored in the 'Medical Reports' section of your dashboard."
        },
        {
            question: "Can I upload my own medical scans or documents?",
            answer: "Yes, you can upload external documents in the 'Medical Reports' section using the upload feature."
        }
    ]
};

const FaqsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = Object.entries(faqsData).reduce((acc, [category, items]) => {
        const filteredItems = items.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredItems.length > 0) {
            acc[category] = filteredItems;
        }
        return acc;
    }, {} as Record<string, typeof faqsData["Appointments & Scheduling"]>);

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Typography text="FAQs" variant="bodyRegular" className="text-gray-400" />
            </DashBoardHeader>
            <DashBoardContent>
                <div>
                    <Typography text="Frequently Asked Questions" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-6" />
                    <SearchInput
                        placeholder="Type a keyword to find your answer"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className="w-full max-w-3xl"
                    />
                </div>

                <div className="flex flex-col gap-8 w-full pb-10">
                    {Object.entries(filteredFaqs).map(([category, items]) => (
                        <div key={category}>
                            <Typography text={category} variant="bodyBold" className="text-[#1E8F67] text-xl mb-4" />
                            <Accordion items={items} />
                        </div>
                    ))}
                    {Object.keys(filteredFaqs).length === 0 && (
                        <Typography text="No results found." variant="bodyRegular" className="text-gray-500" />
                    )}
                </div>
            </DashBoardContent>
        </>
    );
};

export default FaqsPage;
