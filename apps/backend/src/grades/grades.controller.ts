import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @Roles('ADMIN', 'TEACHER')
  create(@Body(new ValidationPipe()) dto: CreateGradeDto) {
    return this.gradesService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  list() {
    return this.gradesService.list();
  }
}
