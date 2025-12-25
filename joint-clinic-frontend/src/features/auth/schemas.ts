import { z } from 'zod';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Copied from backend to ensure parity
export const RequestOtpSchema = z.object({
    subjectType: z.enum(['report', 'login', 'register']),
    subjectRef: z.string().min(1),
    contact: z.string().min(1).optional()
});

export const FindUserSchema = z.object({
    contact: z.string().min(1)
});

export const CreatePartialUserSchema = z.object({
    fullName: z.string().min(1),
    gender: z.enum(['Male', 'Female', 'male', 'female']),
    contact: z.string().min(1),
    birthdate: z.string().refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), { message: "Invalid date format, expected YYYY-MM-DD" }).transform((val) => dayjs.utc(val).toDate())
});

export const VerifyOtpSchema = z.object({
    otpToken: z.string().min(1),
    code: z.string().length(6)
});

export const CreateFullUserSchema = z.object({
    userId: z.string().min(1).optional(),
    contact: z.string().min(1).optional(),
    fullName: z.string().min(1).optional(),
    gender: z.enum(['Male', 'Female', 'male', 'female']).optional(),
    birthdate: z.union([
        z.string().refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), { message: "Invalid date format, expected YYYY-MM-DD" }).transform((val) => dayjs.utc(val).toDate()),
        z.date()
    ]).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(1).optional(),
    identifier: z.string().min(1).optional(),
    identifierType: z.string().min(1).optional(),
    nationality: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    maritalStatus: z.string().min(1).optional(),
    speakingLanguages: z.array(z.string().min(1)).optional(),
});

export type RequestOtpDTO = z.input<typeof RequestOtpSchema>;
export type FindUserDTO = z.input<typeof FindUserSchema>;
export type CreatePartialUserDTO = z.input<typeof CreatePartialUserSchema>;
export type VerifyOtpDTO = z.input<typeof VerifyOtpSchema>;
export type CreateFullUserDTO = z.input<typeof CreateFullUserSchema>;
