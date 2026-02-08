
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/atoms/icons/Logo';
import CorneredBoxes from '../atoms/CorneredBoxes';
import CustomDropdown from '@/components/molecules/dropdown';
import { FaTrash } from "react-icons/fa";

interface InjuryDetails {
    affectedArea?: string;
    startDate?: string;
    receivedTreatment?: boolean;
    painSeverity?: number;
    howDidInjurHappened?: string;
    painOccasionalOrConstant?: 'occasional' | 'constant';
    affectDailyActivities?: boolean;
    additionalNotes?: string;
    medicalReports?: string[];
}

interface InjuryDetailsFormProps {
    jointName: string;
    onBack: () => void;
    onContinue: (details: InjuryDetails) => void;
    isLoading?: boolean;
    error?: string | null;
}

const InjuryDetailsForm: React.FC<InjuryDetailsFormProps> = ({ jointName, onBack, onContinue, isLoading = false, error = null }) => {
    const [formData, setFormData] = useState<InjuryDetails>({});
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert files to file names for now (in a real app, you'd upload and get URLs)
        const fileNames = files.map(f => f.name);
        onContinue({ ...formData, medicalReports: fileNames.length > 0 ? fileNames : undefined });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    // Dropdown options
    const treatmentOptions = ['Yes', 'No'];
    const severityOptions = ['Minimal', 'Moderate', 'Severe'];
    const startDateOptions = ['Last Week', 'Last Month', 'Last Year'];
    const painTypeOptions = ['Occasional', 'Constant'];
    const dailyActivitiesOptions = ['Yes', 'No'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mt-[40vh] w-full max-w-7xl h-fit z-50 p-4"
        >
            {/* Glassy Container */}
            <CorneredBoxes type="glass" className="w-[100%] origin-bottom p-8 md:p-12 relative overflow-hidden">

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

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col w-full items-center'>
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-7 w-full gap-x-8 gap-y-6 justify-center items-center">

                        {/* Start Date */}
                        <div className="relative w-full lg:col-span-3">
                            <CustomDropdown
                                variant="form"
                                required
                                items={startDateOptions}
                                text="When did this injury start?"
                                onSelect={(value) => {
                                    const now = new Date();
                                    if (value === 'Last Week') now.setDate(now.getDate() - 7);
                                    else if (value === 'Last Month') now.setMonth(now.getMonth() - 1);
                                    else if (value === 'Last Year') now.setFullYear(now.getFullYear() - 1);
                                    setFormData({ ...formData, startDate: now.toISOString() });
                                }}
                                value={formData.startDate ? (() => {
                                    const diff = Date.now() - new Date(formData.startDate).getTime();
                                    const day = 24 * 60 * 60 * 1000;
                                    if (diff < 8 * day) return 'Last Week';
                                    if (diff < 32 * day) return 'Last Month';
                                    return 'Last Year';
                                })() : undefined}
                            />
                        </div>

                        {/* Treatment Before */}
                        <div className="relative w-full lg:col-span-4">
                            <CustomDropdown
                                variant="form"
                                required
                                items={treatmentOptions}
                                text="Have you received any treatment before?"
                                onSelect={(value) => setFormData({ ...formData, receivedTreatment: value === 'Yes' })}
                                value={formData.receivedTreatment !== undefined ? (formData.receivedTreatment ? 'Yes' : 'No') : undefined}
                            />
                        </div>

                        {/* Severity */}
                        <div className="relative w-full lg:col-span-3">
                            <CustomDropdown
                                variant="form"
                                required
                                items={severityOptions}
                                text="How severe is the pain?"
                                onSelect={(value) => {
                                    let severity = 5;
                                    if (value === 'Minimal') severity = 1;
                                    else if (value === 'Moderate') severity = 5;
                                    else if (value === 'Severe') severity = 10;
                                    setFormData({ ...formData, painSeverity: severity });
                                }}
                                value={
                                    formData.painSeverity === 1 ? 'Minimal' :
                                        formData.painSeverity === 10 ? 'Severe' :
                                            formData.painSeverity !== undefined ? 'Moderate' : undefined
                                }
                            />
                        </div>

                        {/* How happened */}
                        <div className="relative w-full lg:col-span-4">
                            <input
                                type="text"
                                required
                                value={formData.howDidInjurHappened || ''}
                                onChange={(e) => setFormData({ ...formData, howDidInjurHappened: e.target.value })}
                                placeholder="How did the injury happen?"
                                className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl hover:bg-white/80 focus:bg-white"
                            />
                        </div>

                        {/* Constant/Occasional */}
                        <div className="relative w-full lg:col-span-3">
                            <CustomDropdown
                                variant="form"
                                required
                                items={painTypeOptions}
                                text="Is the pain constant or occasional?"
                                onSelect={(value) => setFormData({ ...formData, painOccasionalOrConstant: value.toLowerCase() as 'occasional' | 'constant' })}
                                value={formData.painOccasionalOrConstant ? (formData.painOccasionalOrConstant === 'occasional' ? 'Occasional' : 'Constant') : undefined}
                            />
                        </div>

                        {/* Daily Activities */}
                        <div className="relative w-full lg:col-span-4">
                            <CustomDropdown
                                variant="form"
                                required
                                items={dailyActivitiesOptions}
                                text="Does this injury affect your daily activities?"
                                onSelect={(value) => setFormData({ ...formData, affectDailyActivities: value === 'Yes' })}
                                value={formData.affectDailyActivities !== undefined ? (formData.affectDailyActivities ? 'Yes' : 'No') : undefined}
                            />
                        </div>

                        {/* Anything else - Full Width */}
                        <div className="relative w-full lg:col-span-3">
                            <input
                                type="text"
                                required
                                value={formData.additionalNotes || ''}
                                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                placeholder="Anything else you'd like your doctor to know?"
                                className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-[#0D294D]/30 bg-white/50 backdrop-blur-sm text-[#0D294D] placeholder:text-[#6d7a80] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition text-lg md:text-xl hover:bg-white/80 focus:bg-white"
                            />
                        </div>

                        {/* Upload Medical Reports - Optional */}
                        <div className="relative w-full lg:col-span-4 flex flex-col items-center justify-center">
                            <input
                                id="medical-report-upload"
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="medical-report-upload"
                                className="w-full h-[70px] md:h-[80px] px-8 rounded-full border border-dashed border-[#0D294D]/50 bg-white/30 backdrop-blur-sm text-[#6d7a80] flex items-center justify-center cursor-pointer hover:bg-white/60 transition text-center group"
                            >
                                <span className="text-lg md:text-xl group-hover:text-[#0D294D] transition-colors">
                                    Upload Medical Reports or Scans (Optional)
                                </span>
                            </label>

                            {/* Selected Files List */}
                            {files.length > 0 && (
                                <div className="absolute top-[85px] right-[-20%] z-10 flex flex-col mb-8 gap-2 mt-1 w-full items-center">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#0D294D]/10 bg-white shadow-sm">
                                            <span className="text-sm md:text-base text-[#0D294D] font-medium truncate max-w-[200px] md:max-w-[300px]">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFiles(files.filter((_, i) => i !== index));
                                                    const input = document.getElementById('medical-report-upload') as HTMLInputElement;
                                                    if (input) input.value = '';
                                                }}
                                                className="p-1"
                                                title="Remove file"
                                            >
                                                <FaTrash size={14} className='cursor-pointer text-red-500 hover:text-red-700 transition-colors'/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-2xl text-center">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex justify-center gap-6 mt-12">
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={isLoading}
                            className="w-[200px] h-[60px] cursor-pointer py-3 bg-white/50 border-2 border-[#ea392f] text-[#ea392f] rounded-full font-semibold hover:bg-[#ea392f] hover:text-white transition-all duration-300 text-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[200px] h-[60px] cursor-pointer py-3 bg-[#ea392f] text-white rounded-full font-semibold hover:bg-[#d63228] border-2 border-[#ea392f] transition-all duration-300 text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Continue'}
                        </button>
                    </div>
                </form>

            </CorneredBoxes>
        </motion.div>
    );
};

export default InjuryDetailsForm;
