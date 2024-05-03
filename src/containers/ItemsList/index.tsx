'use client'
import ItemForm from '@/src/components/ItemForm';
import { Priority } from '@/src/enums';
import { useListInfo } from '@/src/store/useListInfo';
import { useEffect, useState } from 'react';

interface IItemList {
  itemsData: any[];
}

const ItemsList = ({ itemsData }: IItemList) => {
  const { listInfo } = useListInfo();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  const onClickAddItem = () => {
    const newItem = {
      listId: listInfo!.id,
      checked: false,
      title: null,
      priority: Priority.NO_PRIORITY,
      flagged: false,
      tags: [],
      subItems: [],
    };
    const copiedItems = [ ...items ];
    copiedItems.push(newItem);
    setItems(copiedItems);
  };

  return (
    <>
      <div className='pb-8 flex justify-between text-[36px]'>
        <div>{listInfo?.name}</div>
        <div>{listInfo?.items.length}</div>
      </div>
      <button onClick={onClickAddItem}>newItem</button>
      {items.map((item) => (
        <ItemForm key={item.id} item={item} />
      ))}
    </>
  )
}

export default ItemsList;