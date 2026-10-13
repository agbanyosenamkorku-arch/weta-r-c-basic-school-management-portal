import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userTeacher.findMany({ include: { user: true, subjects: true } });
  }

  async create(dto: CreateTeacherDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new BadRequestException('Teacher email already exists');

    const passwordHash = await bcrypt.hash('defaultPassword123', 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: 'TEACHER',
      },
    });

    return this.prisma.userTeacher.create({
      data: {
        userId: user.id,
        employeeNo: dto.employeeNo,
        department: dto.department,
      },
      include: { user: true, subjects: true },
    });
  }

  async assignSubject(teacherId: string, subjectId: string) {
    const teacher = await this.prisma.userTeacher.findUnique({ where: { id: teacherId } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    const subject = await this.prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject) throw new NotFoundException('Subject not found');

    return this.prisma.subject.update({
      where: { id: subjectId },
      data: { teacherId },
      include: { teacher: true },
    });
  }

  async remove(id: string) {
    const teacher = await this.prisma.userTeacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException('Teacher not found');

    await this.prisma.userTeacher.delete({ where: { id } });
    return { message: 'Teacher deleted successfully' };
  }
}
