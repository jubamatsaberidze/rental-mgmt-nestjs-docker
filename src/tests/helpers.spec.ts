import { dateDiff, checkWeekDay } from '../helpers/date.helper';
import { calculateRentPrice } from '../helpers/price.helper';

describe('calculateRentPrice', () => {
  let startDate: Date = new Date('2022-12-01');
  let endDate: Date = new Date('2022-12-16');
  it('should calculate the rent price and return number', () => {
    const res = calculateRentPrice(startDate, endDate);
    expect(res).toBe(14150);
  });
  it('should return max date range message', () => {
    startDate = new Date('2022-11-01');
    const res = calculateRentPrice(startDate, endDate);
    expect(res).toBe('Maximum renting range is 30 days.');
  });
  it('should return invalid date range', () => {
    endDate = new Date('2021-01-01');
    const res = calculateRentPrice(startDate, endDate);
    expect(res).toBe('Invalid Date Range.');
  });

  test('should return BadReuest with message Invalid Date', () => {
    endDate = new Date('2021-01-41');
    expect(calculateRentPrice(startDate, endDate)).toBe('Invalid Date');
  });
});

describe('dateDiff', () => {
  const start: Date = new Date('2022-12-01');
  let end: Date = new Date('2022-12-16');
  it('should return number describing date difference', () => {
    const res = dateDiff(start, end);
    expect(res).toEqual(15);
  });

  test('should return error: Invalid date range', () => {
    end = new Date('2022-11-30');
    const res = dateDiff(start, end);
    expect(res).toEqual('Invalid date range.');
  });
});

describe('checkWeekDay', () => {
  test('should return false cause none of date is sat/sun', () => {
    expect(
      checkWeekDay(new Date('2023-01-02'), new Date('2023-01-11')),
    ).toEqual(false);
  });

  test('should return true cause one of dates is sunday', () => {
    expect(
      checkWeekDay(new Date('2023-12-02'), new Date('2023-01-01')),
    ).toEqual(true);
  });
});
