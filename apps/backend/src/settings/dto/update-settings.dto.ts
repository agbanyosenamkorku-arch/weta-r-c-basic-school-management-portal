import { IsNotEmpty } from 'class-validator';

export class UpdateSchoolSettingsDto {
  @IsNotEmpty()
  schoolName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  motto: string;

  @IsNotEmpty()
  contactEmail: string;
}
