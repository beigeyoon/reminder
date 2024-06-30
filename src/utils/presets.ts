import { Item, List, PresetList } from "../common/types"

interface filterPresetItemProps {
  selectedList: List | PresetList;
  item: Item;
}

export const isPresetListItem = ({ selectedList, item }: filterPresetItemProps) => {
  const date = new Date(item.dateTime);
  const today = new Date();
  if (selectedList?.id === 'today-list') {
    const isSameYear = date.getFullYear() === today.getFullYear();
    const isSameMonth = date.getMonth() === today.getMonth();
    const isSameDay = date.getDate() === today.getDate();
    return isSameYear && isSameMonth && isSameDay;
  } else if (selectedList?.id === 'scheduled-list') {
    today.setHours(0, 0, 0, 0);
    return (date > today) || (!item.checked);
  } else if (selectedList?.id === 'checked-list') {
    return item.checked;
  } else return item.listId === selectedList?.id;
};

interface getPresetItemsProps {
  selectedList: List | PresetList;
  items: Item[];
}

export const getPresetItems = ({ selectedList, items }: getPresetItemsProps) => {
  
}