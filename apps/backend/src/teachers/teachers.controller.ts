import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @Roles('ADMIN', 'TEACHER')
  findAll() {
    return this.teachersService.findAll();
  }

  @Post()
  @Roles('ADMIN')
  create(@Body(new ValidationPipe()) dto: CreateTeacherDto) {
    return this.teachersService.create(dto);
  }

  @Post(':teacherId/assign-subject/:subjectId')
  @Roles('ADMIN')
  assignSubject(@Param('teacherId') teacherId: string, @Param('subjectId') subjectId: string) {
    return this.teachersService.assignSubject(teacherId, subjectId);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
