'use client'
import { useListInfo } from '@/src/store/useListInfo';

interface IItemsCalendar {
  itemsData: any[];
}

const ItemsCalendar = ({ itemsData }: IItemsCalendar) => {
  const { selectedList } = useListInfo();

  return (
    <div>{selectedList?.name} class</div>
  )
}

export default ItemsCalendar;