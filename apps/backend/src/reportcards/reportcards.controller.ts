import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ReportCardsService } from './reportcards.service';

@Controller('reportcards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportCardsController {
  constructor(private readonly reportCardsService: ReportCardsService) {}

  @Post('generate/:studentId')
  @Roles('ADMIN', 'TEACHER')
  generate(@Param('studentId') studentId: string) {
    return this.reportCardsService.generate(studentId);
  }
}
