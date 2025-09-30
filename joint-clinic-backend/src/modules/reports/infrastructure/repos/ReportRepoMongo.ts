import { ReportRepoPort } from '../../application/ports/ReportRepoPort.js';
import { MedicalReport } from '../../domain/MedicalReport.js';
import { MedicalReportModel } from '../models/MedicalReportModel.js';

export const ReportRepoMongo: ReportRepoPort = {
  async create(r) {
    const doc = await MedicalReportModel.create(r);
    return doc.toObject() as MedicalReport;
  },
  async findById(id) {
    const doc = await MedicalReportModel.findById(id).lean();
    return doc as MedicalReport | null;
  }
};
