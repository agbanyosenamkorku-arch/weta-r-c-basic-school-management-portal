import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimetableDto) {
    return this.prisma.timetable.create({
      data: {
        classroomId: dto.classroomId,
        subjectId: dto.subjectId,
        dayOfWeek: dto.dayOfWeek,
        startTime: dto.startTime,
        endTime: dto.endTime,
      },
      include: { classroom: true, subject: true },
    });
  }

  async list() {
    return this.prisma.timetable.findMany({ include: { classroom: true, subject: true } });
  }
}
