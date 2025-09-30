import { register, token } from './container.js';
import { OTPRepoPort } from '../modules/auth/application/ports/OTPRepoPort.js';
import { OTPRepoMongo } from '../modules/auth/infrastructure/repos/OTPRepoMongo.js';
import { BookingRepoPort } from '../modules/booking/application/ports/BookingRepoPort.js';
import { BookingRepoMongo } from '../modules/booking/infrastructure/repos/BookingRepoMongo.js';
import { ReportRepoPort } from '../modules/reports/application/ports/ReportRepoPort.js';
import { ReportRepoMongo } from '../modules/reports/infrastructure/repos/ReportRepoMongo.js';
import type { BlobPort } from '../modules/reports/application/infra-ports/BlobPort.js';
import { blobAzureAdapter } from '../infra/storage/blob.azure.adapter.js';

export const OTP_REPO = token<OTPRepoPort>('OTP_REPO');
export const BOOKING_REPO = token<BookingRepoPort>('BOOKING_REPO');
export const REPORT_REPO = token<ReportRepoPort>('REPORT_REPO');
export const BLOB_PORT = token<BlobPort>('BLOB_PORT');

export function bindAll() {
  register(OTP_REPO, OTPRepoMongo);
  register(BOOKING_REPO, BookingRepoMongo);
  register(REPORT_REPO, ReportRepoMongo);
  register(BLOB_PORT, blobAzureAdapter);
}
