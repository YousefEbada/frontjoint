import dayjs from 'dayjs';
export const startOfDay = (d: Date) => dayjs(d).startOf('day').toDate();
export const endOfDay = (d: Date) => dayjs(d).endOf('day').toDate();
// export const convertToUTC = (d: Date) => dayjs.utc(d).toDate();
export const startOfWeek = (d: Date) => dayjs(d).startOf('week').toDate();
export const startOfMonth = (d: Date) => dayjs(d).startOf('month').toDate();