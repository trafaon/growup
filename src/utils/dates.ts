export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isDatePast = (date: string): boolean => {
  return new Date(date) < new Date();
};

export const sortByDueDate = <T extends { dueDate: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};