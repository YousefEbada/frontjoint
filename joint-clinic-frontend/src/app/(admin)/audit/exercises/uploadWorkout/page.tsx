"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateExercise } from "@/hooks/useExercises";
import { DifficultyLevel } from "@/lib/api/exercises.api";

const muscleGroups = ["Shoulders", "Arms", "Back", "Legs", "Core", "Chest"];
const equipmentOptions = ["None", "Dumbbells", "Resistance Bands", "Mat", "Pull-up Bar", "Foam Roller"];
const difficultyLevels: DifficultyLevel[] = ["beginner", "intermediate", "advanced"];

const UploadWorkout = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ title?: string; video?: string }>({});

    const { mutate: createExercise, isPending, isError, isSuccess, error } = useCreateExercise();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("video/")) {
                setErrors(prev => ({ ...prev, video: "Please select a valid video file" }));
                return;
            }
            setVideoFile(file);
            setErrors(prev => ({ ...prev, video: undefined }));
        }
    };

    const handleMuscleToggle = (muscle: string) => {
        setSelectedMuscles(prev =>
            prev.includes(muscle)
                ? prev.filter(m => m !== muscle)
                : [...prev, muscle]
        );
    };

    const handleEquipmentToggle = (equipment: string) => {
        setSelectedEquipment(prev =>
            prev.includes(equipment)
                ? prev.filter(e => e !== equipment)
                : [...prev, equipment]
        );
    };

    const validateForm = () => {
        const newErrors: { title?: string; video?: string } = {};

        if (!title.trim()) {
            newErrors.title = "Exercise title is required";
        }

        if (!videoFile) {
            newErrors.video = "Please select a video file";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        console.log("============ UPLOAD PAGE: Submitting with:", {
            title: title.trim(),
            description: description.trim() || undefined,
            selectedMuscles: selectedMuscles,
            selectedEquipment: selectedEquipment,
            difficulty: difficulty,
            hasVideo: !!videoFile
        });

        createExercise({
            title: title.trim(),
            description: description.trim() || undefined,
            musclesTargeted: selectedMuscles.length > 0 ? selectedMuscles : undefined,
            equipmentNeeded: selectedEquipment.length > 0 ? selectedEquipment : undefined,
            difficultyLevel: difficulty,
            video: videoFile!,
        }, {
            onSuccess: () => {
                setTimeout(() => {
                    router.push('/audit/exercises');
                }, 1000);
            },
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <>
            <main className="w-full h-full flex flex-col gap-6 p-4 md:p-8 overflow-y-auto custom-scrollbar items-center">
                <div className="w-full md:w-[90%] lg:w-[80%] bg-white rounded-[20px] shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] gap-[30px] flex flex-col items-center h-full overflow-y-auto custom-scrollbar py-10 px-4">
                    <Typography
                        text="Upload Exercise Video"
                        variant="heading1"
                        style={{ fontWeight: "bold" }}
                        className="text-[32px] md:text-[45px] bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center"
                    />

                    {/* Title Input */}
                    <div className="w-full md:w-[80%] flex flex-col gap-2">
                        <label className="text-[#0D294D] font-semibold text-lg">Exercise Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Shoulder Stretch"
                            className="w-full h-[60px] px-5 text-[18px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] outline-none focus:border-[#1E5598]"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    {/* Description Input */}
                    <div className="w-full md:w-[80%] flex flex-col gap-2">
                        <label className="text-[#0D294D] font-semibold text-lg">Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the exercise..."
                            rows={3}
                            className="w-full px-5 py-3 text-[18px] rounded-[20px] border border-[#0D294D] bg-transparent text-[#0D294D] outline-none focus:border-[#1E5598] resize-none"
                        />
                    </div>

                    {/* Muscle Groups Selection */}
                    <div className="w-full md:w-[80%] flex flex-col gap-2">
                        <label className="text-[#0D294D] font-semibold text-lg">Target Muscle Groups</label>
                        <div className="flex flex-wrap gap-2">
                            {muscleGroups.map((muscle) => (
                                <button
                                    key={muscle}
                                    type="button"
                                    onClick={() => handleMuscleToggle(muscle)}
                                    className={`px-4 py-2 rounded-full border transition ${selectedMuscles.includes(muscle)
                                            ? 'bg-[#1E5598] text-white border-[#1E5598] cursor-pointer'
                                            : 'bg-transparent text-[#0D294D] border-[#0D294D] cursor-pointer'
                                        }`}
                                >
                                    {muscle}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Equipment Selection */}
                    <div className="w-full md:w-[80%] flex flex-col gap-2">
                        <label className="text-[#0D294D] font-semibold text-lg">Equipment Needed</label>
                        <div className="flex flex-wrap gap-2">
                            {equipmentOptions.map((equipment) => (
                                <button
                                    key={equipment}
                                    type="button"
                                    onClick={() => handleEquipmentToggle(equipment)}
                                    className={`px-4 py-2 rounded-full border transition ${selectedEquipment.includes(equipment)
                                            ? 'bg-[#1E5598] text-white border-[#1E5598] cursor-pointer'
                                            : 'bg-transparent text-[#0D294D] border-[#0D294D] cursor-pointer'
                                        }`}
                                >
                                    {equipment}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Level */}
                    <div className="w-full md:w-[80%]">
                        <CustomSelect
                            items={difficultyLevels}
                            placeholder="Difficulty Level"
                            onChange={(value) => setDifficulty(value as DifficultyLevel)}
                            width="100%"
                            height="60px"
                        />
                    </div>

                    {/* Video Upload */}
                    <div className="relative w-full md:w-[80%] flex flex-col gap-2">
                        <label className="text-[#0D294D] font-semibold text-lg">Video File *</label>
                        <input
                            id="upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isPending}
                        />
                        <label
                            htmlFor="upload"
                            className={`w-full h-[80px] px-5 text-[18px] md:text-[24px] rounded-full border border-[#0D294D] bg-transparent text-center flex items-center justify-center cursor-pointer outline-none border-dashed transition ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#1E5598]'
                                }`}
                        >
                            {videoFile ? videoFile.name : 'Upload Video File'}
                        </label>
                        {errors.video && <p className="text-red-500 text-sm">{errors.video}</p>}
                    </div>

                    {/* Status Messages */}
                    {isPending && (
                        <p className="text-[#1E5598] font-semibold text-lg">Uploading exercise...</p>
                    )}
                    {isSuccess && (
                        <p className="text-[#1C9A55] font-semibold text-lg">Exercise uploaded successfully!</p>
                    )}
                    {isError && (
                        <p className="text-red-500 font-semibold text-lg">
                            Error: {(error as any)?.message || 'Failed to upload exercise'}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full justify-center">
                        <Button
                            text="Cancel"
                            variant="fourth"
                            active={true}
                            className="w-full sm:w-[220px] md:w-[270px] m-0 h-[50px] text-[#1e5598]"
                            onClick={handleCancel}
                            disabled={isPending}
                        />
                        <Button
                            text={isPending ? "Uploading..." : "Proceed"}
                            variant="primary"
                            active={true}
                            className="w-full sm:w-[220px] md:w-[270px] m-0 h-[50px] text-white bg-[#1e5598] hover:bg-[#15467e]"
                            onClick={handleSubmit}
                            disabled={isPending}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default UploadWorkout;
