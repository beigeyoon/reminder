'use client'
import ItemForm from '@/src/components/ItemForm';
import { OrderBy, Priority } from '@/src/common/enums';
import { useListInfo } from '@/src/store/useListInfo';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { orderItems } from '@/src/utils/orderItems';
import { motion, AnimatePresence } from "framer-motion";
import Drawer from '@/src/components/Drawer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getItems } from '@/src/services/item';
import { addItem, AddItemPayload } from '@/src/services/item';
import { useTagInfo } from '@/src/store/useTagInfo';
import { useKeyword } from '@/src/store/useKeyword';
import { useSession } from "next-auth/react";

const ItemsList = () => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;

  const { selectedList } = useListInfo();
  const { tagInfo, setTagInfo } = useTagInfo();
  const { keyword, setKeyword } = useKeyword();

  const [showFinishedItems, setShowFinishedItems] = useState<boolean>(false);
  const [count, setCount] = useState<number>(-1);
  const [checkedItemsCount, setCheckedItemsCount] = useState<number>(0);
  const [isCalanderOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const { data: items } = useQuery({
    queryKey: ['getItems', selectedList?.id, tagInfo?.id, keyword, userId],
    queryFn: () => getItems({
      listId: selectedList?.id,
      tagId: tagInfo?.id,
      keyword,
      userId,
    }),
  });

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (body: AddItemPayload) => addItem(body),
  });

  useEffect(() => {
    if (items) {
      setCount(items.length);
      const count = items?.filter((item) => item.checked).length;
      setCheckedItemsCount(count);
      
      if (tagInfo?.id) {
        setTitle('#' + tagInfo?.name);
      } else if (keyword.length > 0) {
        setTitle(`'${keyword}'에 대한 검색 결과`);
      } else {
        setTitle(selectedList?.name as string);
      }
    }
  }, [items, keyword, selectedList?.name, tagInfo?.id, tagInfo?.name]);

  useEffect(() => {
    setTagInfo(null);
    setKeyword('');
    if (selectedList?.id === 'checked-list') setShowFinishedItems(true);
    if (selectedList?.id === 'scheduled-list') setShowFinishedItems(false);
  }, [selectedList?.id, setKeyword, setTagInfo]);

  const onClickAddItem = async () => {
    const newItem = {
      listId: selectedList!.id,
      checked: false,
      title: '',
      priority: Priority.NO_PRIORITY,
      flagged: false,
      tags: [],
      subItems: [],
    };
    const addedItem = await createItem(newItem);
    items?.push({ ...newItem, id: addedItem.id, isNewItem: true });
  };
  
  const toggleFinishedItems = () => {
    setShowFinishedItems(!showFinishedItems);
  };

  if (items) return (
    <div className='flex flex-col h-svh p-6'>
      <div className='flex justify-end gap-4 pb-6 text-lg text-gray400'>
        <button onClick={onClickAddItem}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button onClick={() => setIsCalendarOpen(true)}>
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      <Drawer
        isOpen={isCalanderOpen}
        close={() => setIsCalendarOpen(false)}
      />
      <div className='pb-4 flex justify-between text-[36px] font-extrabold'>
        <div>{title}</div>
        <div>{count}</div>
      </div>
      <div className='flex justify-between py-3 border-b border-gray200 text-gray500 mb-3'>
        <div className='font-bold'>
          <span className='text-gray300'>{checkedItemsCount}개 완료됨</span>
          {selectedList?.id === 'checked-list' && (
            <>
              <span className='text-gray300'>{` ∙ `}</span>
              <button>지우기</button>
            </>
          )}
        </div>
        {(selectedList?.id !== 'checked-list' && selectedList?.id !== 'scheduled-list') && (
          <button onClick={toggleFinishedItems}>완료된 항목 {showFinishedItems ? '가리기' : '보기'}</button>
        )}
      </div>
      <div id='items' className='grow overflow-y-auto'>
        <AnimatePresence>
          {orderItems({ items, orderBy: selectedList?.orderBy as keyof typeof OrderBy })
            // .filter((item) => isPresetListItem({ selectedList: selectedList!, item }))
            .filter((item) => {
              if (showFinishedItems) return true;
              return !item.checked;
            })
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ItemForm item={item} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ItemsList;