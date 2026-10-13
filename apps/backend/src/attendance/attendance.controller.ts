import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles('ADMIN', 'TEACHER')
  mark(@Body(new ValidationPipe()) dto: MarkAttendanceDto) {
    return this.attendanceService.mark(dto);
  }

  @Get()
  @Roles('ADMIN', 'TEACHER')
  listByDate(@Query('date') date: string) {
    return this.attendanceService.listByDate(date);
  }
}
