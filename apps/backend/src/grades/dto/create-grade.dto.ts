import { IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  subjectId: string;

  @IsNotEmpty()
  examName: string;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  maxScore: number;

  remarks?: string;
}
