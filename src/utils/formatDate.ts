export function formatDate(date: Date | number): string {
  const seconds = Math.floor((+new Date() - +date) / 1000);

  if (seconds > 604800) {
    return new Date(date).toLocaleDateString('en-GB');
  }

  const intervals: [string, number][] = [
    // ['year', 31536000],
    // ['month', 2592000],
    // ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  if (seconds < 15) {
    return 'just now';
  }

  for (const [key, value] of intervals) {
    const interval = seconds / value;
    if (interval >= 1) {
      const roundedInterval = Math.floor(interval);
      return `${roundedInterval} ${key}${roundedInterval > 1 ? 's' : ''} ago`;
    }
  }

  return '';
}
