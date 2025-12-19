import { BookingRepoPort } from 'modules/booking/application/ports/BookingRepoPort.js';
import { SessionRepoPort } from '../../../session/application/ports/SessionRepoPort.js';
import { Session } from '../../../session/domain/Session.js';

// CHECK THIS FUNCTION

export class GetDoctorDashboard {
  constructor(private repo: BookingRepoPort) {}
  async exec(doctorId: string) {
    try {
      const bookings = await this.repo.findBookingsByDoctor(doctorId);
      if (!bookings) {
        return {ok: false, error: 'No bookings found for this doctor'};
      }
      return {ok: true, data: bookings};
    } catch (error) {
      console.error('Error getting doctor dashboard:', error);
      return { ok: false, error: 'Failed to get doctor dashboard data' };
    }
  }
}
// async exec(doctorId: string, period: 'day' | 'week' | 'month' = 'day', date?: Date) {
//   try {
//     const targetDate = date || new Date();
//     let sessions: Session[] = [];

//     // Get sessions based on period
//     switch (period) {
//       case 'day':
//         sessions = await this.repo.findSessionsByDoctorAndDate(doctorId, targetDate);
//         break;
//       case 'week':
//         sessions = await this.repo.findSessionsByDoctorAndWeek(doctorId, targetDate);
//         break;
//       case 'month':
//         sessions = await this.repo.findSessionsByDoctorAndMonth(doctorId, targetDate);
//         break;
//     }

//     // Calculate statistics
//     const stats = this.calculateStats(sessions);
    
//     // Group sessions by status
//     const sessionsByStatus = this.groupSessionsByStatus(sessions);
    
//     // Get today's sessions for quick access
//     const todaySessions = await this.repo.findSessionsByDoctorAndDate(doctorId, new Date());
    
//     return {
//       ok: true,
//       data: {
//         period,
//         targetDate,
//         sessions,
//         stats,
//         sessionsByStatus,
//         todaySessions: todaySessions.filter(s => 
//           s.scheduledDate.toDateString() === new Date().toDateString()
//         ),
//         summary: {
//           totalSessions: sessions.length,
//           completedSessions: stats.completed,
//           scheduledSessions: stats.scheduled,
//           cancelledSessions: stats.cancelled,
//           completionRate: sessions.length > 0 ? Math.round((stats.completed / sessions.length) * 100) : 0
//         }
//       }
//     };
//   } catch (error) {
//     console.error('Error getting doctor dashboard:', error);
//     return { ok: false, error: 'Failed to get doctor dashboard data' };
//   }
// }

// private calculateStats(sessions: Session[]) {
//   return sessions.reduce((acc, session) => {
//     acc[session.status] = (acc[session.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);
// }

// private groupSessionsByStatus(sessions: Session[]) {
//   return {
//     scheduled: sessions.filter(s => s.status === 'scheduled'),
//     inProgress: sessions.filter(s => s.status === 'inProgress'),
//     completed: sessions.filter(s => s.status === 'completed'),
//     cancelled: sessions.filter(s => s.status === 'cancelled'),
//     noShow: sessions.filter(s => s.status === 'noShow')
//   };
// }