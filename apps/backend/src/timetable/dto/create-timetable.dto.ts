import { IsNotEmpty } from 'class-validator';

export class CreateTimetableDto {
  @IsNotEmpty()
  classroomId: string;

  @IsNotEmpty()
  subjectId: string;

  @IsNotEmpty()
  dayOfWeek: string;

  @IsNotEmpty()
  startTime: string;

  @IsNotEmpty()
  endTime: string;
}
