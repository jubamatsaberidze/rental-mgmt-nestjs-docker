import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CarsController } from './modules/cars/cars.controller';
import { CarsService } from './modules/cars/cars.service';
import { RentsController } from './modules/rents/rents.controller';
import { RentsService } from './modules/rents/rents.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
  controllers: [AppController, CarsController, RentsController],
  providers: [AppService, CarsService, RentsService],
})
export class AppModule {}
