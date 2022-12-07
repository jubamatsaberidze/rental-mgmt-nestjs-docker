import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

interface CreateCarDto {
  name: string;
  license_plate: string;
}

const logger = new Logger('FileUploadApplication');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/cars')
  getCars(): Promise<any> {
    return this.appService.getCars();
  }

  @Post('/cars')
  addCar(@Body() createCarDto: CreateCarDto[]): Promise<any> {
    return this.appService.addCar(createCarDto);
  }

  @MessagePattern('append_cars')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    logger.verbose(`[X] Received data. Size: ${data.length}`);
    await this.addCar(data);

    channel.ack(originalMessage);
  }
}
