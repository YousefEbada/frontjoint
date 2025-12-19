export interface SummaryItemData {
  title: string;
  subtitle?: string;
  status: "Done" | "Pending";
  date: string;
  time?: string;
}

export interface DashboardData {
  therapyName: string;
  sessionsCompleted: number;
  totalSessions: number;
  treatmentLength: string;
  exercisesCompleted: number;
  nextAppointment: string;
  progressPercentage: number;
  patientName: string;
  summaryItems: SummaryItemData[];
}

export const mockDashboardData: DashboardData = {
  therapyName: "Shoulder Therapy",
  sessionsCompleted: 5,
  totalSessions: 16,
  treatmentLength: "8 Weeks",
  exercisesCompleted: 12,
  nextAppointment: "2024-07-15",
  progressPercentage: 35, // Approx 5/16
  patientName: "Patient Name",
  summaryItems: [
    {
      title: "Exercise 12",
      subtitle: "Shoulder therapy session",
      status: "Done",
      date: "Today",
      time: "Oct 12 - 4:00Pm",
    },
    {
      title: "Exercise 13",
      subtitle: "Shoulder therapy session",
      status: "Pending",
      date: "Tomorrow",
      time: "Oct 12 - 3:00Pm",
    },
  ],
};
