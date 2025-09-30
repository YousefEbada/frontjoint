import { z } from 'zod';
export const RequestOtpSchema = z.object({ subjectType: z.enum(['report','login']), subjectRef: z.string().min(1) });
export const VerifyOtpSchema = z.object({ subjectType: z.enum(['report','login']), subjectRef: z.string().min(1), code: z.string().length(6) });
