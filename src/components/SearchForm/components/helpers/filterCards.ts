export const filterCards = (search: string, items: string[]) => {
  if (!!!items) return;
  return [...items].filter(item => item.toLowerCase().includes(search.toLowerCase()));
};
