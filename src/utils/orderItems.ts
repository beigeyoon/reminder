import { Item } from "../common/types";

export const orderItems = (items: Item[]) => {
  if (!items || !Array.isArray(items)) {
    console.error('Input is not an array or is undefined/null');
    return [];
  }

  items.forEach((item, index) => {
    if (!item.createdTime || isNaN(new Date(item.createdTime).getTime())) {
      console.error(`Invalid createdTime at index ${index}:`, item.createdTime);
    }
  });

  return items.slice().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
};
