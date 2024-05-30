'use client'
import { useListInfo } from '@/src/store/useListInfo';

const ItemsCalendar = () => {
  const { listInfo } = useListInfo();

  return (
    <div>{listInfo?.name} class</div>
  )
}

export default ItemsCalendar;