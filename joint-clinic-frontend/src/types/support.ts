export interface SupportTicket {
  _id: string;
  patientId:
  | string
  | { _id: string; firstName?: string; lastName?: string; fullName?: string }; // Handle potential population
  contact: string;
  inquiryDept: string;
  whenToCall: string; // ISO Date string from backend
  message: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  status?: string; // Re-added to fix build error
  // status is removed, priority is removed
}

export interface CreateSupportTicketRequest {
  contact: string;
  inquiryDept: string;
  whenToCall: string; // Date string (ISO)
  message: string;
  patientId: string;
  patientName: string;
}

export interface UpdateSupportTicketRequest {
  completed?: boolean;
  inquiryDept?: string;
  whenToCall?: string;
  message?: string;
  contact?: string;
  status?: string;
}

export interface GetSupportTicketsQuery {
  completed?: boolean; // query by completion status
  inquiryDept?: string; // query by department
  patientId?: string;
  page?: number;
  limit?: number;
}
