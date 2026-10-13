import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        userId,
        title: dto.title,
        message: dto.message,
      },
    });
  }

  async list() {
    return this.prisma.announcement.findMany({ include: { user: true } });
  }
}
