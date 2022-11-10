import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsDate()
  @IsDateString()
  start: Date;

  @IsNotEmpty()
  @IsDate()
  @IsDateString()
  end: Date;
}
