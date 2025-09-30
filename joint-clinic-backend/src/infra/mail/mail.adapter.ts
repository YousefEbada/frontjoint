import { MailPort } from './mail.port.js';
export const mailAdapter: MailPort = {
  async send(to, templateId, payload) {
    console.log('[EMAIL]', { to, templateId, payload });
  }
};
