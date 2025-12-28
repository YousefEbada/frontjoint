"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import doctorsData from '@/components/organisms/WhoWeAre/doctors.json';
import NavBar from '@/components/organisms/NavBar/NavBar';

export default function DoctorDetailPage() {
    const params = useParams();
    const doctorId = params?.id as string ?? '';

    const doctor = doctorsData.doctors.find(d => d.id === doctorId);

    if (!doctor) {
        return (
            <>
                <NavBar />
                <div className="min-h-screen bg-gradient-to-b from-[#0D294D] to-[#1E5598] flex items-center justify-center pt-28">
                    <div className="text-white text-center">
                        <h1 className="text-4xl font-bold mb-4">Doctor Not Found</h1>
                        <Link href="/ourteam" className="text-[#4a9ec7] hover:underline">
                            Back to Our Team
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-b from-[#0D294D] to-[#1E5598] py-8 px-4 pt-28">
                <div className="max-w-[1200px] mx-auto">
                    {/* Back Button & Close */}
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            href="/ourteam"
                            className="flex items-center gap-2 text-[#0D294D] bg-[#d5ece3] px-4 py-2 rounded-md hover:bg-[#c0e0d4] transition-colors font-medium text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to our team
                        </Link>

                        <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </div>

                    {/* Doctor Name */}
                    <h1 className="text-[32px] md:text-[48px] font-bold text-[#0D294D] mb-8">
                        {doctor.name}
                    </h1>

                    {/* Content Grid */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        {/* Left Column - Photo & Info */}
                        <div className="flex flex-col items-center md:items-start">
                            {/* Doctor Photo */}
                            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={doctor.imgUrl}
                                    alt={doctor.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Specialty */}
                            <p className="text-[#4a9ec7] font-semibold text-lg">
                                {doctor.major}
                            </p>

                            {/* Branch */}
                            <p className="text-gray-300 text-sm mb-6">
                                {doctor.branch}
                            </p>

                            {/* Book Now Button */}
                            <Link
                                href="/patient/booking"
                                className="bg-[#ee3124] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#d63228] transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Right Column - Biography */}
                        <div className="flex-1">
                            {/* Biography Section */}
                            <div className="mb-8">
                                <h2 className="text-[24px] md:text-[32px] font-bold text-[#0D294D] mb-4">
                                    Biography
                                </h2>

                                <div className="mb-4">
                                    <h3 className="text-[#ee3124] font-semibold text-lg mb-2">
                                        Qualifications:
                                    </h3>
                                    <p className="text-gray-300 whitespace-pre-line">
                                        {doctor.qualifications}
                                    </p>
                                </div>
                            </div>

                            {/* Treats Section */}
                            <div>
                                <h2 className="text-[20px] md:text-[24px] font-bold text-[#0D294D] mb-4">
                                    Treats the following cases:
                                </h2>

                                <ul className="space-y-2">
                                    {doctor.treatsCases.map((treatCase, index) => (
                                        <li key={index} className="text-gray-300 flex items-start gap-2">
                                            <span className="text-[#ee3124] font-bold">•</span>
                                            {treatCase}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}