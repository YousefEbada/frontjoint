export interface OTP {
  _id: string;
  subjectType: 'report'|'login';
  subjectRef: string;
  codeHash: string;
  expiresAt: Date;
  attempts: number;
  status: 'active'|'locked'|'used'|'expired';
}
