'use client'
import { Item } from "@/src/common/types";
import { useState, useRef, useCallback } from "react";
import DateTime from "./DateTime";
import PrioritySelect from "./PrioritySelect";
import FlagButton from "./FlagButton";
import Tags from "./Tags";
import { Checkbox } from "antd";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateItemPayload, updateItem, DeleteItemPayload, deleteItem } from "@/src/services/item";
import { useListInfo } from "@/src/store/useListInfo";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { getTagsArray, updateTagLists } from "@/src/utils/getTagsArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SubItems from "./SubItems";
import ContextMenu, { ContextMenuItem } from "../ContextMenu";
import { PriorityIcon } from './PriorityIcon';
import { useClickAway } from "react-use";
import UnactiveItem from './UnactiveItem';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useControl } from '@/src/store/useControl';
import { useSession } from "next-auth/react";

interface IItemForm {
  item: Item;
  removeItem: ({ ids }: { ids: string[] }) => void;
}

const ItemForm = ({ item, removeItem }: IItemForm) => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;

  const isNewItem = item.isNewItem;
  const { selectedList } = useListInfo();
  const { expandedItems, setExpandedItems } = useControl();
  const listId = selectedList?.id;
  
  const [showSubItems, setShowSubItems] = useState<boolean>(expandedItems.includes(item.id as string));
  const [isActive, setIsActive] = useState<boolean>(isNewItem ? true : false);
  const itemFormRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();

  useClickAway(itemFormRef, async () => {
    if (isActive) {
      if (!getValues('title') || getValues('title').length === 0) {
        setValue('title', isNewItem ? '새로운 항목' : item.title);
      }
      handleSubmit(onSubmit)();
      setIsActive(false);
    }
  });

  const { mutateAsync: editItem } = useMutation({
    mutationFn: (body: UpdateItemPayload) => updateItem(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['getItems'] as InvalidateQueryFilters);
    }
  });

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checked: item?.checked,
      title: item?.title,
      memo: item?.memo || null,
      url: item?.url || null,
      priority: item?.priority,
      flagged: item?.flagged,
      tags: getTagsArray(item?.tags),
      dateTime: item?.dateTime,
      hasTime: item?.hasTime || false,
      subItems: item?.subItems,
    }
  });

  const onClickCheckbox = async (e: CheckboxChangeEvent) => {
    e.stopPropagation();
    const result = await editItem({
      id: item.id as string,
      checked: e.target.checked,
    });
    if (result.ok) {
      setValue('checked', e.target.checked);
    };
  };

  const onSubmit: SubmitHandler<any> = useCallback((data) => {
    editItem({
      id: item.id,
      userId,
      ...data,
      tags: updateTagLists(getTagsArray(item?.tags), data.tags),
    });
  }, [editItem, item.id, item?.tags, userId]);

  const onDelete = useCallback(async (itemId: string) => {
    const result = await removeItem({ ids: [itemId] });
  }, [removeItem]);

  const menuItems: ContextMenuItem[] = [
    {
      id: 'delete-list',
      caption: '아이템 삭제',
      type: 'normal',
      onClick: () => onDelete(item.id as string),
    },
  ];

  const handleSubItemsToggle = (e?: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e) e.stopPropagation();
    setShowSubItems(!showSubItems);
    if (showSubItems) {
      setExpandedItems(expandedItems.filter((id) => id !== item.id));
    } else {
      setExpandedItems([...expandedItems, item.id as string]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
      setIsActive(false);
    }
  }

  const formStyle = {
    active: 'border-2 rounded border-blue p-[8px]',
    inactive: 'cursor-default',
  };

  return (
    <ContextMenu id={`item-form-${item.id}`} items={menuItems} width={160}>
      <form className={`flex items-start gap-3 mb-[8px] ${isActive ? formStyle['active'] : formStyle['inactive']}`} ref={itemFormRef} onKeyDown={handleKeyDown}>
        <Controller name='checked' control={control} render={({ field }) => <Checkbox {...field} checked={field.value} onChange={(e) => onClickCheckbox(e)} />} />
        <div className='w-full'>
          <div className='flex justify-between border-b border-gray100 pb-[4px]' onClick={() => setIsActive(true)}>
            {isActive ? (
              <div className='flex flex-col leading-[22px]'>
                <div className='flex'>
                  <PriorityIcon priority={getValues('priority')!} />
                  <input id='title' {...register('title')} className='w-full' autoFocus={isNewItem} />
                </div>
                <input id='memo' placeholder="메모" {...register('memo')} className='text-gray400' />
                <input id='url' placeholder="url" {...register('url')} className='text-blue' />
                <Controller name='tags' control={control} render={({ field }) => <Tags {...field} />} />
                <div className='flex gap-3'>
                  <Controller name='dateTime' control={control} render={({ field }) => <DateTime control={control} {...field} />} />
                  <Controller name='priority' control={control} render={({ field }) => <PrioritySelect {...field} />} />
                  <Controller name='flagged' control={control} render={({ field }) => <FlagButton {...field} />} />
                </div>
              </div>
            ) : (
              <UnactiveItem item={getValues()} listId={item.listId} />
            )}
            <div className='h-fit flex items-center gap-3 pt-[4px]'>
              {(!isActive && getValues('flagged')) && (
                <FontAwesomeIcon icon={activeFlag} className='text-ORANGE' fontSize={10} />
              )}
              {getValues('subItems').length > 0 && (
                <div className='w-[28px] flex justify-between items-center'>
                  <span className='text-gray400'>{getValues('subItems').length}</span>
                  {showSubItems ? (
                    <FontAwesomeIcon icon={faChevronDown} className='text-PURPLE' fontSize={10} onClick={(e) => handleSubItemsToggle(e)} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} className='text-PURPLE' fontSize={10} onClick={(e) => handleSubItemsToggle(e)} />
                  )}
                </div>
              )}
            </div>
          </div>
          <Controller name='subItems' control={control} render={({ field }) => <SubItems isActive={isActive} itemId={item.id} {...field} showSubItems={showSubItems} handleSubItemsToggle={handleSubItemsToggle} />} />
        </div>
      </form>
    </ContextMenu>
  )
}

export default ItemForm;