import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [studentsCount, teachersCount, classesCount, pendingFees] = await Promise.all([
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'TEACHER' } }),
      this.prisma.classRoom.count(),
      this.prisma.fee.aggregate({
        where: { status: 'PENDING' },
        _sum: { amount: true },
      }),
    ]);

    return {
      metrics: {
        students: studentsCount,
        teachers: teachersCount,
        classes: classesCount,
        pendingFees: pendingFees._sum.amount ?? 0,
      },
    };
  }
}
