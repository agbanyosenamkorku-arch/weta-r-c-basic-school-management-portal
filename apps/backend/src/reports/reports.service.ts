import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentReport(studentId: string) {
    const student = await this.prisma.userStudent.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        grades: { include: { subject: true } },
        attendance: true,
        fees: true,
      },
    });

    if (!student) return null;

    return {
      student,
      totalFees: student?.fees.reduce((sum, item) => sum + item.amount, 0) ?? 0,
      attendanceCount: student?.attendance.length ?? 0,
    };
  }

  async getClassSummary() {
    const classes = await this.prisma.classRoom.findMany({ include: { enrollments: true } });
    return classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      section: cls.section,
      studentCount: cls.enrollments.length,
    }));
  }
}
