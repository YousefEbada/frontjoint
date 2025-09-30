import dayjs from 'dayjs';
import { OTPRepoPort } from '../ports/OTPRepoPort.js';
import { randomCode, hashValue } from '../../../../shared/utils/crypto.js';
import { security } from '../../../../config/security.js';
import { randomUUID } from 'node:crypto';

export class RequestOtp {
  constructor(private otpRepo: OTPRepoPort) {}
  async exec(subjectType: 'report'|'login', subjectRef: string) {
    const code = randomCode(6);
    const codeHash = await hashValue(code);
    const expiresAt = dayjs().add(security.otp.ttlMinutes, 'minute').toDate();
    await this.otpRepo.create({ _id: randomUUID(), subjectType, subjectRef, codeHash, expiresAt, attempts: 0, status: 'active' });
    return { code }; // for demo; in prod send via SMS/Email
  }
}
