"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import doctorsData from '@/components/organisms/WhoWeAre/doctors.json';
import NavBar from '@/components/organisms/NavBar/NavBar';

export default function OurTeamPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDoctors = doctorsData.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.major.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-b from-[#0D294D] to-[#1E5598] py-10 px-4 pt-28">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-[40px] md:text-[64px] font-bold text-white">
                            Meet Our Team
                        </h1>

                        <div className="flex items-center gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search By Specialist"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-[200px] md:w-[250px] px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E5598]"
                                />
                            </div>

                            {/* Close Button */}
                            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
                        {filteredDoctors.map((doctor) => (
                            <Link
                                key={doctor.id}
                                href={`/ourteam/${doctor.id}`}
                                className="flex flex-col items-center text-center group cursor-pointer"
                            >
                                {/* Doctor Image */}
                                <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden mb-3 border-3 border-white group-hover:border-[#ee3124] transition-all duration-300">
                                    <Image
                                        src={doctor.imgUrl}
                                        alt={doctor.name}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Doctor Name */}
                                <h3 className="text-[16px] md:text-[20px] font-bold text-white group-hover:text-[#ee3124] transition-colors">
                                    {doctor.name}
                                </h3>

                                {/* Specialty */}
                                <p className="text-[12px] md:text-[14px] text-[#4a9ec7] font-medium">
                                    {doctor.major}
                                </p>

                                {/* Branch */}
                                <p className="text-[11px] md:text-[13px] text-gray-300">
                                    {doctor.branch}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}