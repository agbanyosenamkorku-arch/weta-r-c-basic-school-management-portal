import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async mark(dto: MarkAttendanceDto) {
    return this.prisma.attendance.create({
      data: {
        studentId: dto.studentId,
        date: new Date(dto.date),
        status: dto.status as any,
        remarks: dto.remarks,
      },
    });
  }

  async listByDate(date: string) {
    return this.prisma.attendance.findMany({
      where: { date: new Date(date) },
      include: { student: true },
    });
  }
}
