import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typography from '@/components/atoms/Typography';

export interface JointMarkerProps {
    x: number; // Percentage relative to container width
    y: number; // Percentage relative to container height
    label: string;
    side: 'left' | 'right'; // Which side to show the label
    isSelected: boolean;
    onClick: () => void;
}

const JointMarker: React.FC<JointMarkerProps> = ({ x, y, label, side, isSelected, onClick }) => {
    return (
        <div
            className="absolute z-50 pointer-events-none" // pointer-events-none for wrapper, auto for children
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            {/* The Dot */}
            <button
                onClick={onClick}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 transition-all duration-300 pointer-events-auto
                ${isSelected
                        ? 'bg-[#F4B741] border-[#F4B741] scale-125'
                        : 'bg-white border-white hover:scale-150 shadow-md'
                    }`}
                aria-label={`Select ${label}`}
            />

            {/* The Line and Label (Only visible when selected) */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none
                        ${side === 'left' ? 'flex-row-reverse right-3 md:right-6' : 'flex-row left-3 md:left-6'}`}
                    >
                        {/* Connecting Line */}
                        <div className="h-[2px] w-6 md:w-12 bg-[#3668a0]" />

                        {/* Label Text */}
                        <div className={`whitespace-nowrap ${side === 'left' ? 'mr-2 md:mr-3' : 'ml-2 md:ml-3'}`}>
                            <Typography
                                variant="heading2"
                                className="text-[#1E5598] font-bold text-[14px] md:text-[24px]"
                                text={label}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JointMarker;
