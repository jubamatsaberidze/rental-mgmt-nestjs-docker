export const dateDiff = (startDate: Date, endDate: Date) => {
  const currentDate = new Date();
  if (startDate === currentDate) return 'Start date cannot be current day.';
  if (startDate >= endDate) return 'Invalid date range.';

  const end = new Date(endDate).getTime();
  const start = new Date(startDate).getTime();
  return (end - start) / (1000 * 60 * 60 * 24);
};
