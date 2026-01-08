import api from "./axios";
import {
  SupportTicket,
  CreateSupportTicketRequest,
  UpdateSupportTicketRequest,
  GetSupportTicketsQuery,
} from "@/types/support";

const BASE_URL = "/support";

export const createSupportTicket = async (
  data: CreateSupportTicketRequest
): Promise<SupportTicket> => {
  // Backend expects 'requesterPhone' etc in body
  const response = await api.post(BASE_URL, data);
  return response.data.ticket || response.data.data;
};

export const getAllSupportTickets = async (
  query?: GetSupportTicketsQuery
): Promise<SupportTicket[]> => {
  const response = await api.get(BASE_URL, { params: query });
  return response.data.tickets || response.data.data || [];
};

export const getSupportTicketsByPatient = async (
  patientId: string,
  query?: GetSupportTicketsQuery
): Promise<SupportTicket[]> => {
  const response = await api.get(`${BASE_URL}/patient/${patientId}`, {
    params: query,
  });
  return response.data.tickets || response.data.data || [];
};

export const updateSupportTicketStatus = async (
  ticketId: string,
  data: UpdateSupportTicketRequest
): Promise<SupportTicket> => {
  const response = await api.put(`${BASE_URL}/${ticketId}`, data);
  return response.data.ticket || response.data.data;
};

export const deleteSupportTicket = async (ticketId: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${ticketId}`);
};
