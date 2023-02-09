import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @IsNotEmpty({ message: 'email is required!' })
  email: string;

  password: string;

  @IsNotEmpty({ message: 'mobile number is required!' })
  @IsInt()
//   @Min(0)
//   @Max(10)
  phone: number;

  createdAt: Date;
}
