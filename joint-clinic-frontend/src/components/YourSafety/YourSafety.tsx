import Image from 'next/image'
import React from 'react'

const YourSafety = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[#0A1C32] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Your Safety,
            <br />
            Our Priority
          </h1>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-4xl text-[#0A1C32] leading-none">•</span>
              <div>
                <h2 className="text-lg text-[#0A1C32] font-bold">HIPAA-Compliant Platform</h2>
                <p className="text-gray-700 mt-1">Full compliance with healthcare data standards.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex justify-center md:justify-end">
          <Image
            src="/swimmer.png"
            alt="safety image"
            width={400}
            height={400}
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default YourSafety
