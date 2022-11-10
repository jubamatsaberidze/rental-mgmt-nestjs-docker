import { Module } from '@nestjs/common';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';
import { DatabaseService } from 'src/database/database.service';
import { CarsModule } from '../cars/cars.module';

@Module({
  controllers: [RentsController],
  providers: [RentsService, DatabaseService],
  imports: [CarsModule],
})
export class RentsModule {}
