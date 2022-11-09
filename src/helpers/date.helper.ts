export const dateDiff = (startDate: Date, endDate: Date) => {
  if (startDate >= endDate) return 'Invalid date range.';
  const end = new Date(endDate).getTime();
  const start = new Date(startDate).getTime();
  return (end - start) / (1000 * 60 * 60 * 24);
};

export const checkWeekDay = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate).getDay();
  const end = new Date(endDate).getDay();

  if (start === 0 || start === 6 || end === 0 || end === 6) return true;
  else return false;
};
