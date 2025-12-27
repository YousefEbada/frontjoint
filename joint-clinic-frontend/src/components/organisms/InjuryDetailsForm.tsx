
import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@/components/atoms/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Logo from '@/components/atoms/icons/Logo'; // Import Logo
import CorneredBoxes from '../atoms/CorneredBoxes';

interface InjuryDetailsFormProps {
    jointName: string;
    onBack: () => void;
    onContinue: () => void;
}

const InjuryDetailsForm: React.FC<InjuryDetailsFormProps> = ({ jointName, onBack, onContinue }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-[40vh] w-full max-w-6xl h-fit z-50 p-4"
        >
            {/* Glassy Container */}
            <CorneredBoxes type="glass" className="w-full origin-bottom p-8 md:p-12 relative overflow-hidden">

                {/* <div className="w-full origin-bottom bg-[#f0f9f6]/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[40px] p-8 md:p-12 relative overflow-hidden"> */}

                {/* Logo in Top Right */}
                <div className="absolute top-8 right-8 md:top-10 md:right-10 opacity-80">
                    <Logo fill="#0D294D" className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]" />
                </div>

                {/* Header Section */}
                <div className="text-center mb-10 mt-4">
                    <h2 className="md:text-[42px] text-[28px] font-bold text-[#0D294D] text-center mb-2">
                        You Selected {jointName},
                    </h2>

                    <p className="md:text-[18px] text-[15px] text-center text-[#0D294D]/70 font-medium max-w-2xl mx-auto leading-relaxed">
                        You've selected the affected area. Please answer a few quick questions to help us understand your injury better.
                    </p>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-x-8 gap-y-6 place-items-center">

                    {/* Start Date */}
                    <div className="relative w-full md:col-span-3">
                        <input type="date" placeholder="When did this injury start?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border  border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl truncate pr-12 hover:bg-white/80 focus:bg-white" />
                        <FontAwesomeIcon icon={faCaretDown} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none" />
                    </div>

                    {/* Treatment Before */}
                    <div className="relative w-full md:col-span-4">
                        <input type="text" placeholder="Have you received any treatment for this injury before?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl truncate pr-12 hover:bg-white/80 focus:bg-white" />
                        <FontAwesomeIcon icon={faCaretDown} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none" />
                    </div>

                    {/* Severity */}
                    <div className="relative w-full md:col-span-2">
                        <input type="text" placeholder="How severe is the pain?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl truncate pr-12 hover:bg-white/80 focus:bg-white" />
                        <FontAwesomeIcon icon={faCaretDown} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none" />
                    </div>

                    {/* How happened */}
                    <div className="relative w-full md:col-span-5">
                        <input type="text" placeholder="How did the injury happen?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl hover:bg-white/80 focus:bg-white" />
                    </div>

                    {/* Constant/Occasional */}
                    <div className="relative w-full md:col-span-3">
                        <input type="text" placeholder="Is the pain constant or occasional?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl truncate pr-12 hover:bg-white/80 focus:bg-white" />
                        <FontAwesomeIcon icon={faCaretDown} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none" />
                    </div>

                    {/* Daily Activities */}
                    <div className="relative w-full md:col-span-4">
                        <input type="text" placeholder="Does this injury affect your daily activities?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl truncate pr-12 hover:bg-white/80 focus:bg-white" />
                        <FontAwesomeIcon icon={faCaretDown} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#0D294D] pointer-events-none" />
                    </div>

                    {/* Anything else - Full Width */}
                    <div className="relative w-full md:col-span-3">
                        <input type="text" placeholder="Anything else you'd like your doctor to know?" className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl hover:bg-white/80 focus:bg-white" />
                    </div>

                    {/* Upload - Full Width centered */}
                    <div className="relative w-full md:col-span-4 flex justify-center">
                        <div className=" w-full h-[70px] md:h-[80px] px-8 rounded-full border border-dashed border-[#0D294D]/50 bg-white/30 backdrop-blur-sm text-[#6d7a80] flex items-center justify-center cursor-pointer hover:bg-white/60 transition text-center group">
                            <span className="text-lg md:text-xl group-hover:text-[#0D294D] transition-colors">Upload Medical Reports or Scans</span>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="flex justify-center gap-6 mt-12">
                    <button
                        onClick={onBack}
                        className="w-[200px] h-[60px] cursor-pointer py-3 bg-white/50 border-2 border-[#ea392f] text-[#ea392f] rounded-full font-semibold hover:bg-[#ea392f] hover:text-white transition-all duration-300 text-lg shadow-sm"
                    >
                        Back
                    </button>
                    <button
                        onClick={onContinue}
                        className="w-[200px] h-[60px] cursor-pointer py-3 bg-[#ea392f] text-white rounded-full font-semibold hover:bg-[#d63228] border-2 border-[#ea392f] transition-all duration-300 text-lg shadow-md hover:shadow-lg"
                    >
                        Continue
                    </button>
                </div>

                {/* </div> */}
            </CorneredBoxes>
        </motion.div>
    );
};

export default InjuryDetailsForm;
