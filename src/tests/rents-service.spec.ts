import { Test, TestingModule } from '@nestjs/testing';
import { RentsController } from '../modules/rents/rents.controller';
import { RentsService } from '../modules/rents/rents.service';
import { CreateRentDto } from 'src/modules/rents/dto/add-rent.dto';
import { calculateRentPrice } from '../helpers/price.helper';
import { checkWeekDay } from '../helpers/date.helper';
import { BadRequestException } from '@nestjs/common';

describe('RentsController', () => {
  let controller: RentsController;

  const mockRentService = {
    rentCar: jest.fn((car_id, dto) => {
      if (checkWeekDay(dto.start, dto.end)) {
        return new BadRequestException();
      }
      return {
        id: 1,
        car_id,
        ...dto,
        rent_price: calculateRentPrice(dto.start, dto.end),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentsController],
      providers: [RentsService],
    })
      .overrideProvider(RentsService)
      .useValue(mockRentService)
      .compile();

    controller = module.get<RentsController>(RentsController);
  });

  test('controller should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('POST new rent', () => {
    expect(mockRentService.rentCar).not.toHaveBeenCalled();
    const car_id = 1;
    const createRentDto: CreateRentDto = {
      start: new Date('2023-01-02'),
      end: new Date('2023-01-17'),
    };

    expect(controller.rentCar(car_id, createRentDto)).toEqual({
      id: expect.any(Number),
      ...createRentDto,
      rent_price: 14150,
      car_id,
    });
    expect(mockRentService.rentCar).toHaveBeenCalledWith(car_id, createRentDto);
  });

  it('returns error when date range is invalid', () => {
    const car_id = 1;
    const createRentDto: CreateRentDto = {
      start: new Date('2023-01-02'),
      end: new Date('2023-02-10'),
    };

    expect(controller.rentCar(car_id, createRentDto)).toEqual({
      id: expect.any(Number),
      ...createRentDto,
      rent_price: 'Maximum renting range is 30 days.',
      car_id,
    });

    createRentDto.end = new Date('2022-12-30');
    expect(controller.rentCar(car_id, createRentDto)).toEqual({
      id: expect.any(Number),
      ...createRentDto,
      rent_price: 'Invalid Date Range.',
      car_id,
    });
    expect(mockRentService.rentCar).toHaveBeenCalledWith(car_id, createRentDto);
  });

  it('return BadRequest error if one of date is sat/sun', () => {
    const car_id = 1;
    const createRentDto: CreateRentDto = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-10'),
    };

    expect(controller.rentCar(car_id, createRentDto)).toEqual(
      new BadRequestException(),
    );
    expect(mockRentService.rentCar).toHaveBeenCalledWith(car_id, createRentDto);
  });
});
