import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty() 
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}