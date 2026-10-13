import { Module } from '@nestjs/common';
import { ReportCardsController } from './reportcards.controller';
import { ReportCardsService } from './reportcards.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReportCardsController],
  providers: [ReportCardsService, PrismaService],
})
export class ReportCardsModule {}
