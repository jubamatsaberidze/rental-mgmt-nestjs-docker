import { dateDiff } from './date.helper';

export const calculateRentPrice = (startDate: Date, endDate: Date) => {
  const tariff = 1000;
  const diff: any = dateDiff(startDate, endDate);
  if (startDate > endDate) return 'Invalid Date Range.';
  if (isNaN(diff)) {
    return 'Invalid Date';
  }
  if (diff > 30) {
    return 'Maximum renting range is 30 days.';
  }
  const price = 0;

  const calcPrice = (tariff: number, diff: any, price: number): number => {
    const tax = diff >= 18 ? 0.15 : diff >= 10 ? 0.1 : diff >= 5 ? 0.05 : 0;
    if (diff === 0) return price;
    else {
      return calcPrice(tariff, diff - 1, price + (tariff - tariff * tax));
    }
  };
  return calcPrice(tariff, diff, price);
};
