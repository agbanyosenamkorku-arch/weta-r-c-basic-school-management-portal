import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGradeDto) {
    return this.prisma.grade.create({
      data: {
        studentId: dto.studentId,
        subjectId: dto.subjectId,
        examName: dto.examName,
        score: dto.score,
        maxScore: dto.maxScore,
        remarks: dto.remarks,
      },
    });
  }

  async list() {
    return this.prisma.grade.findMany({
      include: {
        student: { include: { user: true } },
        subject: true,
      },
    });
  }
}
