"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import Input from "@/components/atoms/Input";
import CustomSelect from "@/components/atoms/CustomSelect";
import TextArea from "@/components/atoms/TextArea";
import ActionButton from "@/components/atoms/ActionButton";
import { createSupportTicket } from "@/lib/api/support.api";

const ContactForm = () => {
    const departmentOptions = [
        { value: "general", label: "General Inquiry" },
        { value: "billing", label: "Billing" },
        { value: "technical", label: "Technical Support" },
        { value: "medical", label: "Medical Question" },
    ];

    const [form, setForm] = useState({
        phone: "",
        department: "",
        subject: "", // "When to call" mapping to subject for now, or just generic subject
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.department || !form.message) return; // Simple validation

        setIsLoading(true);
        setStatus('idle');
        try {
            await createSupportTicket({
                department: form.department,
                subject: form.subject || "Call Request",
                description: form.message,
                requesterPhone: form.phone,
                priority: "medium"
            });
            setStatus('success');
            setForm({ phone: "", department: "", subject: "", message: "" });
        } catch (error) {
            console.error("Failed to submit ticket:", error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full md:bg-white md:rounded-[30px] md:border md:border-gray-200 md:shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-8">
            <Typography
                text="Fill your contact information"
                variant="bodyBold"
                className="text-[#1E8F67] text-lg md:text-xl mb-6"
            />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-[90%] md:h-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Contact Phone Number"
                        type="tel"
                        className="py-3!"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <CustomSelect
                        items={departmentOptions.map(opt => opt.label)}
                        placeholder="Inquiry Department"
                        size="small"
                        className="py-0!"
                        onChange={(val) => {
                            const found = departmentOptions.find(opt => opt.label === val);
                            if (found) handleChange("department", found.value);
                        }}
                    />
                    <Input
                        placeholder="When to call / Subject"
                        type="text"
                        className="py-3!"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                    />
                </div>
                <TextArea
                    placeholder="Message"
                    rows={5}
                    className="h-full md:h-40 py-4!"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                />

                {status === 'success' && <p className="text-green-600 text-sm text-center">Request sent successfully!</p>}
                {status === 'error' && <p className="text-red-600 text-sm text-center">Failed to send request.</p>}

                <div className="flex justify-center md:justify-end mt-2">
                    <ActionButton
                        text={isLoading ? "Sending..." : "Send"}
                        variant="solid"
                        className="w-auto! px-12! h-auto! py-2!"
                        disabled={isLoading}
                        // ActionButton onClick is optional if type="submit" and inside form,
                        // but ActionButton default type is presumably "submit" or "button"?
                        // It renders a <button>. By default buttons in forms submit.
                        // We'll pass the handler explicitly or rely on form onSubmit.
                        // Since we have form onSubmit, we can omit onClick or pass a void wrapper.
                        // But ActionButton now accepts MouseEventHandler.
                        onClick={(e) => handleSubmit(e as any)}
                    />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
