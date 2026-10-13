import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.classRoom.findMany();
  }

  async create(dto: CreateClassDto) {
    return this.prisma.classRoom.create({
      data: {
        name: dto.name,
        section: dto.section,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.classRoom.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Class not found');

    await this.prisma.classRoom.delete({ where: { id } });
    return { message: 'Class deleted' };
  }
}
