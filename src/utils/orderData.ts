import { Item, List } from "../common/types";
import { OrderBy } from "../common/enums";

interface orderItemsProps {
  items: Item[];
  orderBy: keyof typeof OrderBy;
}

export const orderItems = ({ items, orderBy }: orderItemsProps) => {
  if (!items || !Array.isArray(items)) {
    console.error('Input is not an array or is undefined/null');
    return [];
  }

  items.forEach((item, index) => {
    if (!item.createdTime || isNaN(new Date(item.createdTime).getTime())) {
      console.error(`Invalid createdTime at index ${index}:`, item.createdTime);
    }
  });

  return items.slice().sort((a, b) => {
    const dateA = new Date(a.createdTime).getTime();
    const dateB = new Date(b.createdTime).getTime();
    
    switch (orderBy) {
      case 'NEWEST':
        return dateB - dateA;
      case 'OLDEST':
        return dateA - dateB;
      case 'PRIORITY':
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        } else {
          return dateB - dateA;
        }
      default:
        return 0;
    }
  });
};

export const orderLists = (lists: List[]) => {
  console.log('💚💚💚💚💚', lists);
  if (!lists || !Array.isArray(lists)) {
    console.error('Input is not an array or is undefined/null');
    return [];
  }

  lists.forEach((list, index) => {
    if (!list.createdTime || isNaN(new Date(list.createdTime).getTime())) {
      console.error(`Invalid createdTime at index ${index}:`, list.createdTime);
    }
  });

  return lists.slice().sort((a, b) => {
    const dateA = new Date(a.createdTime).getTime();
    const dateB = new Date(b.createdTime).getTime();
    return dateB - dateA;
  });
}