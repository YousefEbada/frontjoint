import React from "react";
import Typography from "@/components/atoms/Typography";
import "./roleList.css";

interface RoleListProps {
    title: string;
    major: string;
    count: number;
}

export default function RoleManage({ title, major, count }: RoleListProps) {
    return (
        <div className="w-full bg-transparent flex flex-col gap-2">
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    className="w-full rounded-[20px] md:rounded-full bg-[#eff6ff] overflow-hidden grid grid-cols-2 md:grid-cols-6 items-center md:px-4 md:py-0 md:h-[50px] border border-none"
                >
                    {/* Column 1: Icon & Title */}
                    <div className="col-span-2 md:col-span-4 flex items-center gap-3 px-4 py-3 md:p-0 border-b border-blue-200 md:border-none">
                        <div className="w-5 h-5 rounded-full border border-blue-500 shrink-0"></div>
                        <Typography
                            text={title}
                            variant="bodyBold"
                            className="text-blue-900"
                        />
                    </div>

                    {/* Column 2: Major */}
                    <div className="col-span-1 flex items-center justify-center relative py-3 md:py-0 border-r border-blue-200 md:border-r-0">
                        <Typography
                            text={major}
                            variant="bodyRegular"
                            className="text-[#3869a5] text-center font-medium"
                        />
                    </div>

                    {/* Column 3: Edit Action */}
                    <div className="col-span-1 flex items-center justify-center gap-4 py-3 md:py-0">
                        <Typography
                            text="Edit"
                            variant="bodyRegular"
                            className="text-[#ee3124] underline cursor-pointer text-center font-medium"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
