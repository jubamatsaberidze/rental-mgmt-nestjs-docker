import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService, DatabaseService],
  exports: [CarsService],
})
export class CarsModule {}
