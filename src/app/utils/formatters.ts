export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return new Date(date).toISOString().split('T')[0];
};

export const formatDateReadable = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};

export const getDaysDifference = (date1: Date | string, date2: Date | string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isNewEmployee = (createdDate: string, timeframeDays: number): boolean => {
  if (!createdDate) return false;
  const now = new Date();
  const created = new Date(createdDate);
  const diffDays = getDaysDifference(created, now);
  return diffDays <= timeframeDays;
};

export const formatTime = (timeString: string | null): string => {
  if (!timeString) return '-';
  return timeString;
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const snakeCaseToTitleCase = (str: string): string => {
  return str
    .split('_')
    .map(word => capitalizeFirst(word))
    .join(' ');
};
