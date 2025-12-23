"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import Input from "@/components/atoms/Input";
import CustomSelect from "@/components/atoms/CustomSelect";
import TextArea from "@/components/atoms/TextArea";
import ActionButton from "@/components/atoms/ActionButton";

const ContactForm = () => {
    const departmentOptions = [
        { value: "general", label: "General Inquiry" },
        { value: "billing", label: "Billing" },
        { value: "technical", label: "Technical Support" },
        { value: "medical", label: "Medical Question" },
    ];

    return (
        <div className="w-full h-full md:bg-white md:rounded-[30px] md:border md:border-gray-200 md:shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-8">
            <Typography
                text="Fill your contact information"
                variant="bodyBold"
                className="text-[#1E8F67] text-lg md:text-xl mb-6"
            />
            <form className="flex flex-col gap-4 h-[90%] md:h-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input placeholder="Contact Phone Number" type="tel" className="py-3!" />
                    <CustomSelect
                        items={departmentOptions.map(opt => opt.label)}
                        placeholder="Inquiry Department"
                        size="small"
                        className="py-0!"
                    />
                    <Input placeholder="When to call" type="text" className="py-3!" />
                </div>
                <TextArea
                    placeholder="Message"
                    rows={5}
                    className="h-full md:h-40 py-4!"
                />
                <div className="flex justify-center md:justify-end mt-2">
                    <ActionButton
                        text="Send"
                        variant="solid"
                        className="w-auto! px-12! h-auto! py-2!"
                    />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
