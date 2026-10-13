import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SettingsService } from './settings.service';
import { UpdateSchoolSettingsDto } from './dto/update-settings.dto';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles('ADMIN')
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  @Roles('ADMIN')
  updateSettings(@Body(new ValidationPipe()) dto: UpdateSchoolSettingsDto) {
    return this.settingsService.updateSettings(dto);
  }
}
