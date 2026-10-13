import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSchoolSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    return {
      schoolName: 'Weta R. C. Basic School',
      address: 'School Address',
      motto: 'Knowledge, Discipline and Service',
      contactEmail: 'info@wetarc.edu.gh',
    };
  }

  async updateSettings(dto: UpdateSchoolSettingsDto) {
    return {
      ...dto,
      updated: true,
    };
  }
}
