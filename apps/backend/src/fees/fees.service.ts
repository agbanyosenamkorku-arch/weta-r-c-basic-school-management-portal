import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeeDto } from './dto/create-fee.dto';

@Injectable()
export class FeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFeeDto) {
    return this.prisma.fee.create({
      data: {
        studentId: dto.studentId,
        description: dto.description,
        amount: dto.amount,
        dueDate: new Date(dto.dueDate),
      },
    });
  }

  async list() {
    return this.prisma.fee.findMany({ include: { student: { include: { user: true } } } });
  }
}
