'use client'
import ItemForm from '@/src/components/ItemForm';
import { Priority } from '@/src/enums';
import { useListInfo } from '@/src/store/useListInfo';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { orderItems } from '@/src/utils/orderItems';

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

  const onClickDeleteItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  return (
    <>
      <div className='flex justify-end gap-4 pb-6 text-lg text-gray400'>
        <button>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button onClick={onClickAddItem}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className='pb-8 flex justify-between text-[36px]'>
        <div>{listInfo?.name}</div>
        <div>{listInfo?.items.length}</div>
      </div>
      {orderItems(items).filter((item) => item.listId === listInfo?.id).map((item) => (
        <ItemForm key={item.id} item={item} onClickDeleteItem={onClickDeleteItem} />
      ))}
    </>
  )
}

export default ItemsList;