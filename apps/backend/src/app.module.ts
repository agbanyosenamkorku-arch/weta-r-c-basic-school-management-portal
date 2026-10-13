import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradesModule } from './grades/grades.module';
import { FeesModule } from './fees/fees.module';
import { TimetableModule } from './timetable/timetable.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportsModule } from './reports/reports.module';
import { ParentsModule } from './parents/parents.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportCardsModule } from './reportcards/reportcards.module';
import { ImportModule } from './import/import.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    AuthModule,
    StudentsModule,
    ClassesModule,
    AttendanceModule,
    GradesModule,
    FeesModule,
    TimetableModule,
    DashboardModule,
    ReportsModule,
    ParentsModule,
    PaymentsModule,
    ReportCardsModule,
    ImportModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
