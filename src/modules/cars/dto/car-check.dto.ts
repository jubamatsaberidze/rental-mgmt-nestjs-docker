import { IsNotEmpty, IsDate, IsDateString } from 'class-validator';

export class DateDto {
  @IsNotEmpty()
  @IsDate()
  @IsDateString({ strict: true } as any)
  start: Date;

  @IsNotEmpty()
  @IsDate()
  @IsDateString()
  end: Date;
}
