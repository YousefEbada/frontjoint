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
  const response = await api.post(BASE_URL, data);
  // Support controller returns json(result). result = { ok: boolean, data: ... }
  if (response.data && !response.data.ok && response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.data;
};

export const getAllSupportTickets = async (
  query?: GetSupportTicketsQuery
): Promise<SupportTicket[]> => {
  const response = await api.get(BASE_URL, { params: query });
  if (response.data && !response.data.ok && response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.data || [];
};

export const getSupportTicketsByPatient = async (
  patientId: string,
  query?: GetSupportTicketsQuery
): Promise<SupportTicket[]> => {
  const response = await api.get(`${BASE_URL}/patient/${patientId}`, {
    params: query,
  });
  if (response.data && !response.data.ok && response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.data || [];
};

export const updateSupportTicketStatus = async (
  ticketId: string,
  data: UpdateSupportTicketRequest
): Promise<SupportTicket> => {
  const response = await api.put(`${BASE_URL}/${ticketId}`, data);
  if (response.data && !response.data.ok && response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.data;
};

export const deleteSupportTicket = async (ticketId: string): Promise<void> => {
  const response = await api.delete(`${BASE_URL}/${ticketId}`);
  if (response.data && !response.data.ok && response.data.error) {
    throw new Error(response.data.error);
  }
};
