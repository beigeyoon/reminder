'use client'
import { useListInfo } from '@/src/store/useListInfo';

const ItemsClass = () => {
  const { listInfo } = useListInfo();

  return (
    <div>{listInfo?.name} class</div>
  )
}

export default ItemsClass;