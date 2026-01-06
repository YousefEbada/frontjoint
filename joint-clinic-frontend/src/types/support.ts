export interface SupportTicket {
  _id: string;
  patientId: string;
  requesterName?: string;
  requesterPhone?: string;
  department: "general" | "billing" | "technical" | "medical";
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "resolved" | "closed";
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupportTicketRequest {
  department: string;
  subject: string;
  description: string;
  requesterPhone?: string;
  priority?: "low" | "medium" | "high";
}

export interface UpdateSupportTicketRequest {
  status?: "pending" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high";
  note?: string; // If backend supports notes
}

export interface GetSupportTicketsQuery {
  status?: string | string[];
  department?: string;
  patientId?: string;
  page?: number;
  limit?: number;
}
