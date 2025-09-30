import { OTPRepoPort } from '../ports/OTPRepoPort.js';
import { verifyHash } from '../../../../shared/utils/crypto.js';
import { security } from '../../../../config/security.js';

export class VerifyOtp {
  constructor(private otpRepo: OTPRepoPort) { }

  async exec(subjectType: 'report' | 'login', subjectRef: string, code: string) {
    const otp = await this.otpRepo.latest(subjectType, subjectRef);
    if (!otp) return { ok: false, reason: 'not_found' };

    const expired = otp.expiresAt < new Date();
    if (otp.status !== 'active' || expired) {
      otp.status = 'expired';
      await this.otpRepo.save(otp);
      return { ok: false, reason: 'expired' };
    }

    if (otp.attempts >= security.otp.maxAttempts) {
      otp.status = 'locked';
      await this.otpRepo.save(otp);
      return { ok: false, reason: 'locked' };
    }

    const match = await verifyHash(otp.codeHash, code);
    otp.attempts += 1;

    if (match) {
      otp.status = 'used';
      await this.otpRepo.save(otp);
      return { ok: true };
    } else {
      await this.otpRepo.save(otp);
      return { ok: false, reason: 'invalid' };
    }
  }
}
