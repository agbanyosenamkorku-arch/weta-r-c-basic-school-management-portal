import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}

  async addChild(parentId: string, studentId: string) {
    const parent = await this.prisma.userParent.findUnique({ where: { id: parentId } });
    if (!parent) throw new NotFoundException('Parent not found');

    const student = await this.prisma.userStudent.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('Student not found');

    return this.prisma.parentChild.create({
      data: { parentId, studentId },
      include: { student: { include: { user: true } } },
    });
  }

  async listChildren(parentId: string) {
    return this.prisma.parentChild.findMany({
      where: { parentId },
      include: { student: { include: { user: true } } },
    });
  }

  async me(parentUserId: string) {
    const parent = await this.prisma.userParent.findUnique({ where: { userId: parentUserId } });
    if (!parent) throw new NotFoundException('Parent profile not found');
    return this.listChildren(parent.id);
  }
}
