import { useState, useEffect } from "react";
import { SupportTicket, GetSupportTicketsQuery } from "@/types/support";
import {
  getAllSupportTickets,
  updateSupportTicketStatus,
} from "@/lib/api/support.api";

export const useSupportTickets = (
  initialQuery: GetSupportTicketsQuery = {}
) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async (query?: GetSupportTicketsQuery) => {
    setIsLoading(true);
    try {
      const data = await getAllSupportTickets(query || initialQuery);
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (
    ticketId: string,
    status: SupportTicket["status"]
  ) => {
    try {
      await updateSupportTicketStatus(ticketId, { status });
      // Optimistic update
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status } : t))
      );
    } catch (err: any) {
      console.error("Failed to update status", err);
    }
  };

  return { tickets, isLoading, error, refresh: fetchTickets, updateStatus };
};
