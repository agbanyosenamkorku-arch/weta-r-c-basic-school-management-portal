import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importStudentsCsv(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File required');

    const text = file.buffer.toString('utf8');
    const records = parse(text, { columns: true, skip_empty_lines: true });
    const created: any[] = [];

    for (const row of records) {
      const { name, email, admissionNo, dateOfBirth, gender, address, guardianName, guardianPhone } = row;
      if (!name || !email || !admissionNo) continue;

      const exists = await this.prisma.user.findUnique({ where: { email } });
      if (exists) continue;

      const passwordHash = await bcrypt.hash('defaultPassword123', 10);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'STUDENT',
        },
      });

      const student = await this.prisma.userStudent.create({
        data: {
          userId: user.id,
          admissionNo,
          dateOfBirth: new Date(dateOfBirth),
          gender: gender || 'Not Specified',
          address: address || 'N/A',
          guardianName,
          guardianPhone,
        },
        include: { user: true },
      });

      created.push(student);
    }

    return { createdCount: created.length, created };
  }
}
