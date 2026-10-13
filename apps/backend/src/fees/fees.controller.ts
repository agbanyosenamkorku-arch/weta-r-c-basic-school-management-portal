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
import { FeesService } from './fees.service';
import { CreateFeeDto } from './dto/create-fee.dto';

@Controller('fees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body(new ValidationPipe()) dto: CreateFeeDto) {
    return this.feesService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'TEACHER', 'PARENT')
  list() {
    return this.feesService.list();
  }
}
