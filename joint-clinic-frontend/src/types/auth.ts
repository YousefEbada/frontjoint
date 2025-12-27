export interface CreatePartialUserInput {
    fullName: string,
    gender: 'Male' | 'Female' | 'male' | 'female',
    contact: string,
    birthdate: string
}

export interface CreateFullUserInput {
    userId?: string;
    email?: string;
    phone?: string;
    identifier?: string;
    identifierType?: string;
    nationality?: string;
    address?: string;
    city?: string;
    maritalStatus?: string;
    speakingLanguages?: string[];
    guardianInformation?: {
        guardianName?: string;
        guardianEmail?: string;
        guardianPhone?: string;
        guardianBloodType?: string;
        guardianRelation?: string;
        guardianIdentifier?: string;
        guardianIdentifierType?: string;
        patientCategory?: string;
    };
}

export interface RequestOTPInput {
    subjectRef: string;
    subjectType: 'login' | 'register' | 'report';
    contact: string;
}

export interface VerifyOTPInput {
    otpToken: string;
    code: string;
}

export interface CreatePatientInput {
    userId: string,
    injuryDetails: {
        affectedArea?: string;
        startDate?: Date;
        receivedTreatment?: boolean;
        painSeverity?: number; // 0-10 scale
        howDidInjurHappened?: string;
        painOccasionalOrConstant?: 'occasional' | 'constant';
        affectDailyActivities?: boolean;
        additionalNotes?: string;
        // check this from the report module and how to sync it
        medicalReports?: string[];
    };
}