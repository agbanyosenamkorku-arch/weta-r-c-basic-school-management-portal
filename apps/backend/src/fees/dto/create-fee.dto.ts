import { IsNotEmpty } from 'class-validator';

export class CreateFeeDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  dueDate: string;
}
