"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/organisms/NavBar/NavBar";
import doctorsData from "@/components/organisms/WhoWeAre/doctors.json";

export default function DoctorDetailsPage() {
    const params = useParams();
    const doctor = doctorsData.doctors.find(
        (d) => String(d.id) === String(params?.id)
    );

    if (!doctor) {
        return (
            <div className="h-screen flex items-center justify-center">
                Doctor not found
            </div>
        );
    }

    return (
        <>
            <NavBar />

            {/* PAGE WRAPPER */}
            <div className="h-screen bg-gradient-to-b from-[#597b89] to-[#3d5f79] pt-32 px-4 overflow-hidden">
                {/* WHITE CONTAINER */}
                <div className="max-w-[1400px] mx-auto bg-white rounded-[40px] shadow-2xl h-[95%] flex flex-col">

                    {/* HEADER */}
                    <div className="flex justify-between items-start px-8 md:px-12 pt-8 md:pt-12 pb-4">
                        <Link
                            href="/ourteam"
                            className="inline-flex items-center gap-2 text-[#1E5598] text-sm font-medium border border-[#1E5598] px-3 py-1 rounded-md hover:bg-[#1E5598] hover:text-white transition"
                        >
                            ← Back to our team
                        </Link>

                        <Link
                            href="/ourteam"
                            className="text-gray-400 hover:text-[#1E5598] transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-10 pr-[56px]" style={{ scrollbarGutter: "stable" }}>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">

                            {/* LEFT SIDE */}
                            <div className="flex flex-col items-center text-center md:text-left">
                                <div className="w-[160px] mb-4">
                                    <img
                                        src={doctor.imgUrl}
                                        alt={doctor.name}
                                        className="w-full h-auto object-cover rounded-md"
                                    />
                                </div>

                                <h2 className="text-[22px] font-bold text-[#1E5598]">
                                    {doctor.name}
                                </h2>

                                <p className="text-sm text-[#1E5598] font-semibold">
                                    {doctor.major}
                                </p>

                                <p className="text-sm text-gray-500 mb-4">
                                    {doctor.branch}
                                </p>

                                <Link
                                    href="/book"
                                    className="mt-2 bg-[#EE3124] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                                >
                                    Book Now
                                </Link>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="relative pl-8">
                                {/* Vertical Divider */}
                                <span className="absolute left-0 top-0 h-full w-[1px] bg-gray-200" />

                                <h1 className="text-[32px] md:text-[40px] font-bold text-[#1E5598] mb-6">
                                    {doctor.name}
                                </h1>

                                {/* Biography */}
                                <section className="mb-6">
                                    <h3 className="text-[#1E5598] font-bold mb-2">
                                        Biography
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-6 max-w-[700px]">
                                        {doctor.biography ??
                                            "Qualifications: Bachelor’s degree, several years of clinical experience in physiotherapy and rehabilitation."}
                                    </p>
                                </section>

                                {/* Cases */}
                                <section>
                                    <h3 className="text-[#1E5598] font-bold mb-2">
                                        Treats the following cases:
                                    </h3>

                                    <ul className="list-disc pl-5 text-sm text-[#1E5598] space-y-1">
                                        {(doctor.treatsCases ?? [
                                            "Musculoskeletal injury",
                                            "Sports injury",
                                            "Post-operative rehabilitation",
                                            "Chronic joint pain",
                                            "Lower extremity injuries",
                                        ]).map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
