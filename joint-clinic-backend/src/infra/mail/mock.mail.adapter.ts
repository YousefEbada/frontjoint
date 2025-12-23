import { MailPort } from "./mail.port";

export const mailAdapter: MailPort = {
  async send(to, templateId, payload) {
    console.log("[MOCK EMAIL]", { to, templateId, payload });
  }
};