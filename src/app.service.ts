import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCars(): Promise<any> {
    const res = this.databaseService.executeQuery(`SELECT * FROM cars`);
    return res;
  }

  async addCar(createCarDto): Promise<string> {
    const { name, license_plate } = createCarDto;
    if (!name || !license_plate) {
      return 'Invalid values.';
    }
    const res = await this.databaseService.executeQuery(
      `INSERT INTO cars("name", "license_plate")
       VALUES('${name}', '${license_plate}');
      `,
    );

    return res
      ? 'Successfully added new car.'
      : 'Something went wrong...\nTry again later';
  }
}
