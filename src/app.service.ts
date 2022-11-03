import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  async getCars(): Promise<any> {
    const res = new DatabaseService();
    const req = res.executeQuery(`SELECT * FROM cars`);
    return req;
  }
}
