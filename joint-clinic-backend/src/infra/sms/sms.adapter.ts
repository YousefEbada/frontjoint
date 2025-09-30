import { SMSPort } from './sms.port.js';
export const smsAdapter: SMSPort = {
  async send(to, text) {
    console.log('[SMS]', { to, text });
  }
};
