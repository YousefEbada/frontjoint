"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import Input from "@/components/atoms/Input";
import CustomSelect from "@/components/atoms/CustomSelect";
import TextArea from "@/components/atoms/TextArea";
import ActionButton from "@/components/atoms/ActionButton";
import { createSupportTicket } from "@/lib/api/support.api";

export interface ContactFormValues {
    contact: string;
    inquiryDept: string;
    whenToCall: string;
    message: string;
}

interface ContactFormProps {
    buttonText?: string;
    initialValues?: ContactFormValues;
    readOnly?: boolean;
    onSubmit?: (values: any) => Promise<void>;
}

const ContactForm = ({ buttonText = "Send", initialValues, readOnly = false, onSubmit }: ContactFormProps) => {
    const departmentOptions = [
        { value: "general", label: "General Inquiry" },
        { value: "billing", label: "Billing" },
        { value: "technical", label: "Technical Support" },
        { value: "medical", label: "Medical Question" },
    ];

    const [form, setForm] = useState(initialValues || {
        contact: "",
        inquiryDept: "",
        whenToCall: "", // "When to call" mapping to subject for now, or just generic subject
        message: ""
    });

    // Update form if initialValues change
    React.useEffect(() => {
        if (initialValues) {
            setForm(initialValues);
        }
    }, [initialValues]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setStatus('idle');
        try {
            if (onSubmit) {
                await onSubmit(form);
            } else {
                if (!form.inquiryDept || !form.message) return; // Simple validation

                // Ensure whenToCall is a valid date or current date if empty/invalid text
                // Since input is text, we'll try to use it or default to now if backend requires date
                const date = new Date(); // default

                const payload = {
                    inquiryDept: form.inquiryDept,
                    message: form.message,
                    contact: form.contact,
                    whenToCall: date.toISOString(), // Placeholder date since text input doesn't map well to Date object without strict format
                    patientId: localStorage.getItem('patientId') || "",
                    patientName: localStorage.getItem('patientName') || ""
                };

                await createSupportTicket(payload);
                setForm({ contact: "", inquiryDept: "", whenToCall: "", message: "" });
            }
            setStatus('success');
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
                        value={form.contact}
                        onChange={(e) => handleChange("contact", e.target.value)}
                        disabled={readOnly}
                    />
                    <CustomSelect
                        items={departmentOptions.map(opt => opt.label)}
                        placeholder="Inquiry Department"
                        size="small"
                        className="py-0!"
                        onChange={(val) => {
                            const found = departmentOptions.find(opt => opt.label === val);
                            if (found) handleChange("inquiryDept", found.value);
                        }}
                        disabled={readOnly}
                        value={departmentOptions.find(opt => opt.value === form.inquiryDept)?.label}
                    />
                    <Input
                        placeholder="When to call (e.g. Tomorrow 3pm - Note: logged as now)"
                        type="text"
                        className="py-3!"
                        value={form.whenToCall}
                        onChange={(e) => handleChange("whenToCall", e.target.value)}
                        disabled={readOnly}
                    />
                </div>
                <TextArea
                    placeholder="Message"
                    rows={5}
                    className="h-full md:h-40 py-4!"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    disabled={readOnly}
                />

                {status === 'success' && <p className="text-green-600 text-sm text-center">Request sent successfully!</p>}
                {status === 'error' && <p className="text-red-600 text-sm text-center">Failed to send request.</p>}

                <div className="flex justify-center md:justify-end mt-2">
                    <ActionButton
                        text={isLoading ? "Sending..." : buttonText}
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
