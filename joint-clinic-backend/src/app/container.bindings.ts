import { register, token } from './container.js';
import { OTPRepoPort } from '../modules/auth/application/ports/OTPRepoPort.js';
import { OTPRepoMongo } from '../modules/auth/infrastructure/repos/OTPRepoMongo.js';
import { BookingRepoPort } from '../modules/booking/application/ports/BookingRepoPort.js';
import { BookingRepoMongo } from '../modules/booking/infrastructure/repos/BookingRepoMongo.js';
import { ReportRepoPort } from '../modules/reports/application/ports/ReportRepoPort.js';
import { ReportRepoMongo } from '../modules/reports/infrastructure/repos/ReportRepoMongo.js';
import type { BlobPort } from '../modules/reports/application/infra-ports/BlobPort.js';
import { blobAzureAdapter } from '../infra/storage/blob.azure.adapter.js';
import { UserRepoPort } from 'modules/auth/application/ports/UserRepoPort.js';
import { UserRepoMongo } from 'modules/auth/infrastructure/repos/UserRepoMongo.js';
import { MailPort } from 'infra/mail/mail.port.js';
import { SMSPort } from 'infra/sms/sms.port.js';
import { twilioMailAdapter } from 'infra/mail/twilio.mail.adapter.js';
import { smsAdapter } from 'infra/sms/sms.adapter.js';
import { PatientRepoPort } from 'modules/patient/application/ports/PatientRepoPort.js';
import { PatientRepoMongo } from 'modules/patient/infrastructure/repos/PatientRepoMongo.js';
import { DoctorRepoPort } from 'modules/doctor/application/ports/DoctorRepoPort.js';
import { DoctorRepoMongo } from 'modules/doctor/infrastructure/repos/DoctorRepoMongo.js';

export const OTP_REPO = token<OTPRepoPort>('OTP_REPO');
export const BOOKING_REPO = token<BookingRepoPort>('BOOKING_REPO');
export const REPORT_REPO = token<ReportRepoPort>('REPORT_REPO');
export const BLOB_PORT = token<BlobPort>('BLOB_PORT');
export const USER_AUTH_REPO = token<UserRepoPort>('USER_AUTH_REPO');
export const MAIL_REPO = token<MailPort>('MAIL_REPO');
export const SMS_REPO = token<SMSPort>('SMS_REPO');
export const PATIENT_REPO = token<PatientRepoPort>('PATIENT_REPO');
export const DOCTOR_REPO = token<DoctorRepoPort>('DOCTOR_REPO');

export function bindAll() {
  register(OTP_REPO, OTPRepoMongo);
  register(BOOKING_REPO, BookingRepoMongo);
  register(REPORT_REPO, ReportRepoMongo);
  register(BLOB_PORT, blobAzureAdapter);
  register(USER_AUTH_REPO, UserRepoMongo);
  register(MAIL_REPO, twilioMailAdapter);
  register(SMS_REPO, smsAdapter);
  register(PATIENT_REPO, PatientRepoMongo);
  register(DOCTOR_REPO, DoctorRepoMongo)
}
