import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class ReportDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @IsNumberString()
  month: number;
}
