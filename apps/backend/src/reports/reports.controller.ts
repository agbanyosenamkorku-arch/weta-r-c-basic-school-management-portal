import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('student/:studentId')
  @Roles('ADMIN', 'TEACHER', 'STUDENT', 'PARENT')
  getStudentReport(@Param('studentId') studentId: string) {
    return this.reportsService.getStudentReport(studentId);
  }

  @Get('class-summary')
  @Roles('ADMIN', 'TEACHER')
  getClassSummary() {
    return this.reportsService.getClassSummary();
  }
}
