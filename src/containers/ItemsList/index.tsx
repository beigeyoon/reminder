'use client'
import ItemForm from '@/src/components/ItemForm';
import { useListInfo } from '@/src/store/useListInfo';

const ItemsList = () => {
  const { listInfo } = useListInfo();

  return (
    <>
      <div className='pb-8 flex justify-between text-[36px]'>
        <div>{listInfo?.name}</div>
        <div>{listInfo?.items.length}</div>
      </div>
      <ItemForm />
    </>
  )
}

export default ItemsList;