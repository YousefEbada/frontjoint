import { SupportRepoPort } from "../ports/supportRepoPort.js";
import { SupportTicket } from "modules/customer-support/domain/SupportTicket.js";

export class GetTicketById {
    constructor(private supportRepo: SupportRepoPort) {}
    
    async execute(ticketId: string): Promise<SupportTicket | null> {
        try {
            const ticket = await this.supportRepo.getSupportTicket(ticketId);
            return ticket;
        } catch (error) {
            console.error("[GetTicketById] Error:", error);
            throw error;
        }
    }
}