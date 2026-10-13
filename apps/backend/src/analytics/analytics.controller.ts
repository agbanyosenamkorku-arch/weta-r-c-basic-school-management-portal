import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('enrollment-by-month')
  @Roles('ADMIN', 'TEACHER')
  async enrollmentByMonth() {
    const rows = await this.prisma.$queryRawUnsafe(`
      SELECT to_char("enrollmentDate", 'YYYY-MM') AS month, COUNT(*)::int AS count
      FROM "Enrollment"
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `);

    return rows;
  }
}
