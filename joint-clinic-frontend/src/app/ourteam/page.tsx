"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/organisms/NavBar/NavBar";
import doctorsData from "@/components/organisms/WhoWeAre/doctors.json";

export default function OurTeamPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctorsData.doctors.filter(
    (doctor) =>
      doctor.practitionerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />

      {/* PAGE WRAPPER */}
      <div className="h-screen bg-gradient-to-b from-[#597b89] to-[#3d5f79] pt-32 px-4">
        {/* WHITE CONTAINER (no scroll here) */}
        <div className="max-w-[1400px] mx-auto bg-white rounded-[40px] shadow-2xl h-full flex flex-col">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-8 md:px-12 pt-8 md:pt-12 pb-6">
            <h1 className="text-[32px] md:text-[48px] font-bold text-[#1E5598]">
              Meet Our Team
            </h1>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search By Specialist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[220px] px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-600 shadow-md focus:outline-none focus:ring-1 focus:ring-[#1E5598] focus:shadow-lg transition" />

              <Link
                href="/"
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
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              flex-1
              overflow-y-auto
              relative
              right-[30px]
              custom-scrollbar
              px-8 md:px-12
              pb-18
              pr-[56px]
            "
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-14 gap-x-6 justify-items-center pt-4 [&:has(a:hover)>a:not(:hover)]:opacity-40">
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.nixpendId}
                  href={`/ourteam/${doctor.nixpendId}`}
                  className="inline-flex flex-col items-center text-center group transition-opacity duration-300"
                >
                  {/* IMAGE */}
                  <div className="w-[90px] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:translate-y-[-5px]">
                    <img
                      src={doctor.imgUrl}
                      alt={doctor.practitionerName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] md:text-[25px] font-medium text-[#1E5598] group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-300">
                    {doctor.practitionerName}
                  </h3>

                  {/* MAJOR */}
                  <p className="text-[12px] md:text-[17px] text-[#1E5598] font-bold">
                    {doctor.department}
                  </p>

                  {/* BRANCH */}
                  <p className="text-[11px] md:text-[17px] text-[#1E5598] font-medium">
                    {doctor.practitionerCompany?.[0]?.branch ?? ""}
                  </p>
                </Link>
              ))}
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.nixpendId}
                  href={`/ourteam/${doctor.nixpendId}`}
                  className="inline-flex flex-col items-center text-center group transition-opacity duration-300"
                >
                  {/* IMAGE */}
                  <div className="w-[90px] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:translate-y-[-5px]">
                    <img
                      src={doctor.imgUrl}
                      alt={doctor.practitionerName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] md:text-[25px] font-medium text-[#1E5598] group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-300">
                    {doctor.practitionerName}
                  </h3>

                  {/* MAJOR */}
                  <p className="text-[12px] md:text-[17px] text-[#1E5598] font-bold">
                    {doctor.department}
                  </p>

                  {/* BRANCH */}
                  <p className="text-[11px] md:text-[17px] text-[#1E5598] font-medium">
                    {doctor.practitionerCompany?.[0]?.branch ?? ""}
                  </p>
                </Link>
              ))}
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.nixpendId}
                  href={`/ourteam/${doctor.nixpendId}`}
                  className="inline-flex flex-col items-center text-center group transition-opacity duration-300"
                >
                  {/* IMAGE */}
                  <div className="w-[90px] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:translate-y-[-5px]">
                    <img
                      src={doctor.imgUrl}
                      alt={doctor.practitionerName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] md:text-[25px] font-medium text-[#1E5598] group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-300">
                    {doctor.practitionerName}
                  </h3>

                  {/* MAJOR */}
                  <p className="text-[12px] md:text-[17px] text-[#1E5598] font-bold">
                    {doctor.department}
                  </p>

                  {/* BRANCH */}
                  <p className="text-[11px] md:text-[17px] text-[#1E5598] font-medium">
                    {doctor.practitionerCompany?.[0]?.branch ?? ""}
                  </p>
                </Link>
              ))}
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.nixpendId}
                  href={`/ourteam/${doctor.nixpendId}`}
                  className="inline-flex flex-col items-center text-center group transition-opacity duration-300"
                >
                  {/* IMAGE */}
                  <div className="w-[90px] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:translate-y-[-5px]">
                    <img
                      src={doctor.imgUrl}
                      alt={doctor.practitionerName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] md:text-[25px] font-medium text-[#1E5598] group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-300">
                    {doctor.practitionerName}
                  </h3>

                  {/* MAJOR */}
                  <p className="text-[12px] md:text-[17px] text-[#1E5598] font-bold">
                    {doctor.department}
                  </p>

                  {/* BRANCH */}
                  <p className="text-[11px] md:text-[17px] text-[#1E5598] font-medium">
                    {doctor.practitionerCompany?.[0]?.branch ?? ""}
                  </p>
                </Link>
              ))}
              {filteredDoctors.map((doctor) => (
                <Link
                  key={doctor.nixpendId}
                  href={`/ourteam/${doctor.nixpendId}`}
                  className="inline-flex flex-col items-center text-center group transition-opacity duration-300"
                >
                  {/* IMAGE */}
                  <div className="w-[90px] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:translate-y-[-5px]">
                    <img
                      src={doctor.imgUrl}
                      alt={doctor.practitionerName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[15px] md:text-[25px] font-medium text-[#1E5598] group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-300">
                    {doctor.practitionerName}
                  </h3>

                  {/* MAJOR */}
                  <p className="text-[12px] md:text-[17px] text-[#1E5598] font-bold">
                    {doctor.department}
                  </p>

                  {/* BRANCH */}
                  <p className="text-[11px] md:text-[17px] text-[#1E5598] font-medium">
                    {doctor.practitionerCompany?.[0]?.branch ?? ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
