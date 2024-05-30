'use client'
import { useListInfo } from '@/src/store/useListInfo';

interface IItemsCalendar {
  itemsData: any[];
}

const ItemsCalendar = ({ itemsData }: IItemsCalendar) => {
  const { listInfo } = useListInfo();

  return (
    <div>{listInfo?.name} class</div>
  )
}

export default ItemsCalendar;