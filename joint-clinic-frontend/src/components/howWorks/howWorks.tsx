"use client";
import Pagination from '@/pages/pagination'
import React from 'react'

const howWorks = () => {
    const pages = [
        {
            title: "HOLIDAY HOURS UPDATE",
            desc: "Our clinic will be closed on Friday, Sept 25, for maintenance. Online services remain available.",
        },
        {
            title: "NEW SPECIALIST JOINS OUR TEAM",
            desc: "Welcome Dr. Hany, our new physiotherapy expert specializing in sports injury recovery.",
        },
        {
            title: "YOUR RECOVERY UPDATES",
            desc: "Learn about new features added to improve your recovery tracking.",
        },
        {
            title: "Effortless Recovery",
            desc: "Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
        }
    ];
  return (
    <div className='flex flex-col justify-center items-center'>
        <img src="./circle.png" className='w-[240x] h-[240px]'/>
        <div className="content">
            <h1 className='text-[128px] font-bold text-center text-[#0a1c32]'>HOW IT WORKS?</h1>
            <p className='text-center text-[20px] font-medium text-[#167c4f]'>Your Recovery Journey Made Simple</p>
        </div>
        <Pagination total={5} />
    </div>
  )
}

export default howWorks