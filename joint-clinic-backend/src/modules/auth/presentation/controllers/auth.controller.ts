import { Request, Response } from 'express';
import { RequestOtpSchema, VerifyOtpSchema } from '../validators/auth.schemas.js';
import { RequestOtp } from '../../application/use-cases/RequestOtp.js';
import { VerifyOtp } from '../../application/use-cases/VerifyOtp.js';
import { resolve, token } from '../../../../app/container.js';
import { OTPRepoPort } from '../../application/ports/OTPRepoPort.js';

const OTP_REPO = token<OTPRepoPort>('OTP_REPO');

export async function requestOtp(req: Request, res: Response) {
  const { subjectType, subjectRef } = RequestOtpSchema.parse(req.body);
  const uc = new RequestOtp(resolve(OTP_REPO));
  const result = await uc.exec(subjectType, subjectRef);
  res.json({ ok: true, demoCode: result.code });
}

export async function verifyOtp(req: Request, res: Response) {
  const { subjectType, subjectRef, code } = VerifyOtpSchema.parse(req.body);
  const uc = new VerifyOtp(resolve(OTP_REPO));
  const result = await uc.exec(subjectType, subjectRef, code);


  //TODO: Test this part

  // if (result.ok) return res.json(result);
  // const statusMap: Record<string, number> = { invalid: 401, expired: 400, locked: 429, not_found: 404 };
  // return res.status(statusMap[result.reason] ?? 400).json(result);


  res.json(result);
}
