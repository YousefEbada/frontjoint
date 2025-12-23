import React from 'react';
import Typography from '@/components/atoms/Typography';

interface PatientCardProps {
    name: string;
    injury: string;
    status: string;
    statusColor?: string;
    onClick?: () => void;
}

const PatientCard = ({ name, injury, status, statusColor = "text-[#1C9A55]", onClick }: PatientCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-[35px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] px-8 py-6 flex flex-col gap-1 border border-transparent hover:border-[#1E5598] transition-all cursor-pointer w-full"
        >
            <div className="flex justify-between items-center w-full">
                <Typography text={name} variant="subheader" className="" gradient={true} />
                <span className={`${statusColor} font-bold text-base`}>{status}</span>
            </div>
            <Typography text={injury} variant="bodyRegular" className="font-semibold text-lg" gradient={true} />
        </div>
    );
};

export default PatientCard;
