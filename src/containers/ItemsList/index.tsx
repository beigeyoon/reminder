'use client'
import ItemForm from '@/src/components/ItemForm';
import { Priority } from '@/src/enums';
import { useListInfo } from '@/src/store/useListInfo';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { orderItems } from '@/src/utils/orderItems';
import ContextMenu, { ContextMenuItem } from '@/src/components/ContextMenu';

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

  const menuItems: ContextMenuItem[] = [
    {
      id: 'delete-list',
      caption: '완료된 항목 보기',
      type: 'normal',
      onClick: () => {
        
      },
    },
  ];

  return (
    <div className='flex flex-col h-svh p-6'>
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
      <div id='items' className='grow overflow-y-auto'>
        <ContextMenu
          id={`items-list-${listInfo?.id}`}
          items={menuItems}
        >
          {orderItems(items).filter((item) => item.listId === listInfo?.id).map((item) => (
            <ItemForm key={item.id} item={item} onClickDeleteItem={onClickDeleteItem} />
          ))}
        </ContextMenu>
      </div>
    </div>
  )
}

export default ItemsList;