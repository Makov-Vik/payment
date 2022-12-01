import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'must be string' })
  readonly name: string;

  @IsString({ message: 'must be string' })
  @IsEmail({}, { message: 'WRONG_EMAIL'})
  readonly email: string;

  @IsString({ message: 'must be string' })
  @Length(4, 22, { message: 'PASSWORD MUST BE MORE THAN 4 SYMBOLS'})
  readonly password: string;
}
