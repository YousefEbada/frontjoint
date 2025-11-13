import { Request, Response } from 'express';
import { CreatePartialUserSchema, FindUserSchema, RequestOtpSchema, VerifyOtpSchema } from '../validators/auth.schemas.js';
import { RequestOtp } from '../../application/use-cases/RequestOtp.js';
import { VerifyOtp } from '../../application/use-cases/VerifyOtp.js';
import { FindUserByContact } from 'modules/auth/application/use-cases/FindUserByContact.js';
import { CreatePartialUser } from 'modules/auth/application/use-cases/CreatePartialUser.js';
import { CreateFullUser } from 'modules/auth/application/use-cases/CreateFullUser.js';
import { resolve } from '../../../../app/container.js';
import { MAIL_REPO, OTP_REPO, SMS_REPO } from 'app/container.bindings.js';
import { USER_AUTH_REPO } from 'app/container.bindings.js';

export async function findUser(req: Request, res: Response) {
  const { contact } = FindUserSchema.parse(req.body);
  const uc = new FindUserByContact(resolve(USER_AUTH_REPO));
  const user = await uc.exec(contact);
  if (!user) {
    return res.status(400).json({ ok: false, message: 'User Not Found.' });
  }
  res.json({ ok: true, message: 'User Found.', user });
}

// create partial user
export async function createPartialUser(req: Request, res: Response) {
  const { fullName, gender, birthdate, contact } = CreatePartialUserSchema.parse(req.body);
  const userExistsUc = new FindUserByContact(resolve(USER_AUTH_REPO));
  if (await userExistsUc.exec(contact!)) {
    return res.status(400).json({ ok: false, message: 'User Already Exists.' });
  }
  const uc = new CreatePartialUser(resolve(USER_AUTH_REPO));
  const user = await uc.exec(fullName, gender, birthdate, contact);
  console.log("\nuser created", user);
  res.json({ ok: true, message: 'Partial User Created.', user: {id: user._id, fullName: user.fullName, gender: user.gender, birthdate: user.birthdate, email: user.email, phone: user.phone, userStatus: user.userStatus } });
}

// create full user
// how to receieve guardianInformation, patientCategory
export async function createFullUser(req: Request, res: Response) {
  // Accept either userId or contact to locate the existing partial user
  const {
    userId,
    contact,
    fullName,
    gender,
    birthdate,
    email,
    phone,
    identifier,
    identifierType,
    nationality,
    address,
    city,
    maritalStatus,
    speakingLanguages,
    guardianInformation,
    patientCategory,
  } = req.body as any;

  const uc = new CreateFullUser(resolve(USER_AUTH_REPO));
  try {
    const lookup = userId ? { id: userId } : { contact };
    // Build mergedProps only with provided optional fields to persist
    const mergedProps: any = {};
    if (fullName !== undefined) mergedProps.fullName = fullName;
    if (gender !== undefined) mergedProps.gender = gender;
    if (birthdate !== undefined) mergedProps.birthdate = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
    ["email","phone","identifier","identifierType","nationality","address","city","maritalStatus","speakingLanguages","guardianInformation","patientCategory"].forEach(k => {
      if ((req.body as any)[k] !== undefined) mergedProps[k] = (req.body as any)[k];
    });

    const user = await uc.exec(lookup as any, mergedProps);
    res.json({ ok: true, message: 'Full User Created/Completed.', user: { id: user._id, fullName: user.fullName, gender: user.gender, birthdate: user.birthdate, email: user.email, phone: user.phone, userStatus: user.userStatus } });
  } catch (err: any) {
    return res.status(400).json({ ok: false, message: err?.message ?? 'Failed to create full user.' });
  }
}

// request otp
export async function requestOtp(req: Request, res: Response) {
  const { subjectRef, subjectType, contact } = RequestOtpSchema.parse(req.body);
  const uc = new RequestOtp(resolve(OTP_REPO), resolve(SMS_REPO), resolve(MAIL_REPO));
  const result = await uc.exec(subjectType, subjectRef, contact as string);
  res.json({ ok: true, otpToken: result.otpToken });
}

// verify otp
export async function verifyOtp(req: Request, res: Response) {
  const { otpToken, code } = VerifyOtpSchema.parse(req.body);
  const uc = new VerifyOtp(resolve(OTP_REPO), resolve(USER_AUTH_REPO));
  const result = await uc.exec(otpToken, code);
  if (result.ok) return res.json(result);
  const statusMap: Record<string, number> = { invalid: 401, expired: 400, locked: 429, not_found: 404, invalid_token: 401 };
  const status = result.reason ? (statusMap[result.reason] ?? 400) : 400;
  return res.status(status).json(result);
}
