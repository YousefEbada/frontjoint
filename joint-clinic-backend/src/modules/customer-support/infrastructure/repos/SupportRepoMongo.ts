import { SupportRepoPort } from "modules/customer-support/application/ports/supportRepoPort.js";
import { SupportTicketModel } from "../models/SupportModel.js";
import { SupportTicket } from "modules/customer-support/domain/SupportTicket.js";

export const SupportRepoMongo: SupportRepoPort = {
    async createSupportTicket(data) {
        const newTicket = new SupportTicketModel({
            ...data,
            whenToCall: new Date(data.whenToCall)
        })
        await newTicket.save();
        return newTicket as unknown as SupportTicket || null;
    },

    async getSupportTickets() {
        const tickets = await SupportTicketModel.find().lean();
        return tickets as unknown as Array<SupportTicket> || null;
    },

    async getsupportTicketsByPatient(patientId: string) {
        const tickets = await SupportTicketModel.find({ patientId }).lean();
        return tickets as unknown as Array<SupportTicket> || null;
    },

    async getSupportTicket(id: string) {
        const ticket = await SupportTicketModel.findOne({ _id: id }).lean();
        return ticket as unknown as SupportTicket || null;
    },

    async updateSupportTicketStatus(ticketId: string, completed: boolean) {
        const ticket = await SupportTicketModel.updateOne({ _id: ticketId }, { $set: { completed } });
        return ticket as unknown as SupportTicket || null;
    },

    async deleteSupportTicket(id: string) {
        const result = await SupportTicketModel.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}