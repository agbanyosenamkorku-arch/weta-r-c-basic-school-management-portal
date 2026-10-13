import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum RegisterRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(RegisterRole)
  role: RegisterRole;
}
