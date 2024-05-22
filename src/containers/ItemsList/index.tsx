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
  const [showFinishedItems, setShowFinishedItems] = useState<boolean>(false);
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    const count = items.filter((item) => item.checked).length;
    setCheckedItemsCount(count);
  }, [items])

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
  };

  const onClickItemCheckbox = (itemId: string, isChecked: boolean) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          checked: isChecked,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  const toggleFinishedItems = () => {
    setShowFinishedItems(!showFinishedItems);
  };

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
      <div className='pb-4 flex justify-between text-[36px] font-extrabold'>
        <div>{listInfo?.name}</div>
        <div>{listInfo?.items.length}</div>
      </div>
      <div className='flex justify-between py-3 border-b border-gray200 text-gray500 mb-3'>
        <div className='font-bold'>
          <span className='text-gray300'>{checkedItemsCount}개 완료됨 ∙ </span>
          <button>지우기</button>
        </div>
        <button onClick={toggleFinishedItems}>완료된 항목 {showFinishedItems ? '가리기' : '보기'}</button>
      </div>
      <div id='items' className='grow overflow-y-auto'>
        {orderItems(items).filter((item) => item.listId === listInfo?.id).filter((item) => {
          if (showFinishedItems) {
            return true;
          }
          return !item.checked;
        }).map((item) => (
          <ItemForm key={item.id} item={item} onClickDeleteItem={onClickDeleteItem} onClickItemCheckbox={onClickItemCheckbox} />
        ))}
      </div>
    </div>
  )
}

export default ItemsList;