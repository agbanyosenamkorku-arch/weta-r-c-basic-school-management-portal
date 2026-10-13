import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userStudent.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const student = await this.prisma.userStudent.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already used');

    const passwordHash = await bcrypt.hash('defaultPassword123', 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: 'STUDENT',
      },
    });

    return this.prisma.userStudent.create({
      data: {
        userId: user.id,
        admissionNo: dto.admissionNo,
        dateOfBirth: new Date(dto.dateOfBirth),
        gender: dto.gender,
        address: dto.address,
        guardianName: dto.guardianName,
        guardianPhone: dto.guardianPhone,
      },
      include: { user: true },
    });
  }

  async update(id: string, dto: Partial<CreateStudentDto>) {
    const student = await this.prisma.userStudent.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    return this.prisma.userStudent.update({
      where: { id },
      data: {
        admissionNo: dto.admissionNo,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        address: dto.address,
        guardianName: dto.guardianName,
        guardianPhone: dto.guardianPhone,
      },
      include: { user: true },
    });
  }

  async remove(id: string) {
    const student = await this.prisma.userStudent.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    await this.prisma.userStudent.delete({ where: { id } });
    return { message: 'Student deleted successfully' };
  }
}
