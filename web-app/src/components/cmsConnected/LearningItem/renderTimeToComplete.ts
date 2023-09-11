export const renderTimeToComplete = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let string = '';

  if (hours > 0) {
    string += `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  if (remainingMinutes > 0) {
    if (string.length > 0) {
      string += ', ';
    }

    string += `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }

  return string;
};
