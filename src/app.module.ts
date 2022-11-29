import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CarsController } from './modules/cars/cars.controller';
import { CarsService } from './modules/cars/cars.service';
import { RentsController } from './modules/rents/rents.controller';
import { RentsService } from './modules/rents/rents.service';
import { DatabaseService } from './database/database.service';
import { initial_query } from './constants/migration.query';

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
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private databaseService: DatabaseService) {}

  onModuleInit(): any {
    this.logger.verbose(`The AppModule has been initialized successfully.`);
    this.databaseService.executeQuery(initial_query);
    this.logger.verbose(
      `Created "cars" and "rents" TABLE and added static cars data"`,
    );
  }
}
