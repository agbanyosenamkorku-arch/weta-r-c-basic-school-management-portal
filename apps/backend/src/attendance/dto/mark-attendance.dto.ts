import { IsEnum, IsNotEmpty } from 'class-validator';

export enum AttendanceStatusEnum {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export class MarkAttendanceDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  date: string;

  @IsEnum(AttendanceStatusEnum)
  status: AttendanceStatusEnum;

  remarks?: string;
}
