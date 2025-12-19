export interface Patient {
    _id?: string;
    userId: string;
    nixpendId: string;
    guardianInformation?: string;
    medicalRecordNumber?: string;
    insuranceId?: string;
    bloodGroup?: string;
    allergies?: string[];
    medicalHistory?: string[];
    injuryDetails?: {
        affectedArea?: string;
        startDate?: Date;
        receivedTreatment?: boolean;
        painSeverity?: number; // 0-10 scale
        howDidInjurHappened?: string;
        affectDailyActivities?: boolean;
        additionalNotes?: string;
        // check this from the report module and how to sync it
        medicalReports?: string[];
    };
    status?: 'active' | 'inactive';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}