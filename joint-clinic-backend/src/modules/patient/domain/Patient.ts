export interface Patient {
    _id: string,
    userId: string,
    nixpendId: string,
    guardianInformation: string,
    medicalRecordNumber: String,
    insuranceId: String,
    bloodGroup: String,
    allergies: [String],
    injuryDetails: {
        affectedArea: String,
        startDate: Date,
        receivedTreatment: Boolean,
        painSeverity: Number,
        howDidInjurHappened: String,
        affectDailyActivities: Boolean,
        additionalNotes: String,
        // check this from the report module and how to sync it
        medicalReports: [String]
    },
    progress: {
        totalSessions: Number,
        sessionsCompleted: Number,
        totalExercises: Number,
        exercisesCompleted: Number,
        treatmentLengthWeeks: Number,
        treatmentStartDate: Date,
        currentWeek: Number
    },
    //   check the medical history
    medicalHistory: [String],
    notes: String
}