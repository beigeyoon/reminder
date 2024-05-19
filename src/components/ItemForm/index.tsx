'use client'
import { Item } from "@/src/types";
import { useState, useRef, useEffect, useCallback } from "react";
import DateTime from "./DateTime";
import PrioritySelect from "./PrioritySelect";
import FlagButton from "./FlagButton";
import Tags from "./Tags";
import { Checkbox } from "antd";
import { useMutation } from "@tanstack/react-query";
import { AddItemPayload, addItem, UpdateItemPayload, updateItem, DeleteItemPayload, deleteItem } from "@/src/services/item";
import { useListInfo } from "@/src/store/useListInfo";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { getTagsArray, updateTagLists } from "@/src/utils/getTagsArray";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SubItems from "./SubItems";
import ContextMenu, { ContextMenuItem } from "../ContextMenu";
import { Priority } from "@/src/enums";

interface IItemForm {
  item: Item;
  onClickDeleteItem: (itemId: string) => void;
}

const ItemForm = ({ item, onClickDeleteItem }: IItemForm) => {
  const isNewItem = item.id === undefined;
  const { listInfo } = useListInfo();
  const listId = listInfo?.id;
  
  const [showSubItems, setShowSubItems] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(isNewItem ? true : false);
  const itemFormRef = useRef<HTMLFormElement>(null);

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (body: AddItemPayload) => addItem(body),
  });

  const { mutateAsync: editItem } = useMutation({
    mutationFn: (body: UpdateItemPayload) => updateItem(body),
  });

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (body: DeleteItemPayload) => deleteItem(body),
  })

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
  const isChecked = watch('checked');

  useEffect(() => {
    if (isChecked) {
      editItem({
        id: item.id,
        checked: true,
      });
    } else {
      editItem({
        id: item.id,
        checked: false,
      })
    }
  }, [editItem, isChecked, item.id]);

  const onSubmit: SubmitHandler<any> = useCallback((data) => {
    if (isNewItem) {
      createItem({
        listId,
        ...data,
      });
    } else {
      editItem({
        id: item.id,
        ...data,
        tags: updateTagLists(getTagsArray(item?.tags), data.tags),
      });
    }
  }, [createItem, editItem, isNewItem, item.id, item?.tags, listId]);

  const onDelete = useCallback(async (itemId: string) => {
    const result = await removeItem({ id: itemId });
    if (result.ok) {
      onClickDeleteItem(itemId);
    }
  }, [onClickDeleteItem, removeItem]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemFormRef.current && !itemFormRef.current.contains(e.target as Node)) {
        if (isActive) {
          if (!getValues('title') || getValues('title').length === 0) {
            setValue('title', isNewItem ? '새로운 항목' : item.title);
          }
          setIsActive(false);
          handleSubmit(onSubmit)();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleSubmit, onSubmit, isActive, getValues, setValue, isNewItem, item.title]);

  const menuItems: ContextMenuItem[] = [
    {
      id: 'delete-list',
      caption: '아이템 삭제',
      type: 'normal',
      onClick: () => onDelete(item.id),
    },
  ];

  const formStyle = {
    active: 'border-2 rounded border-blue p-[8px]',
    inactive: '',
  };

  return (
    <ContextMenu
      id={`item-form-${item.id}`}
      items={menuItems}
      width={160}
    >
      <form
        className={`flex items-start gap-3 mb-[8px] ${isActive ? formStyle['active'] : formStyle['inactive']}`}
        ref={itemFormRef}
      >
        <Controller
          name='checked'
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value} />
          )}
        />
        <div className='w-full'>
          <div className='flex justify-between border-b border-gray100 pb-[4px]'>
            <div className='flex flex-col leading-[22px]' onClick={() => setIsActive(true)}>
              <div className='flex gap-1'>
                <span className='text-PURPLE'>
                  {getValues('priority') === Priority.LOWER ? '!' : getValues('priority') === Priority.MIDDLE ? '!!' : getValues('priority') === Priority.UPPER ? '!!!' : null}
                </span>
                <input id='title' {...register('title')} />
              </div>
              {(isActive || getValues('memo')) && <input id='memo' placeholder="메모" {...register('memo')} className='text-gray400' />}
              {(isActive || getValues('url')) && <input id='url' placeholder="url" {...register('url')} />}
              <Controller
                name='tags'
                control={control}
                render={({ field }) => (
                  <Tags isActive={isActive} {...field} />
                )}
              />
              <div className='flex gap-3 h-[28px]'>
                <Controller
                  name='dateTime'
                  control={control}
                  render={({ field }) => (
                    <DateTime isActive={isActive} control={control} {...field} />
                  )}
                />
                <Controller
                  name='priority'
                  control={control}
                  render={({ field }) => (
                    <PrioritySelect isActive={isActive} {...field} />
                  )}
                />
                <Controller
                  name='flagged'
                  control={control}
                  render={({ field }) => (
                    <FlagButton isActive={isActive} {...field} />
                  )}
                />
              </div>
            </div>
            <div className='h-fit flex items-center gap-3 pt-[4px]'>
              {(!isActive && getValues('flagged')) && (
                <FontAwesomeIcon icon={activeFlag} className='text-ORANGE' fontSize={10} />
              )}
              {getValues('subItems').length > 0 && (
                <div className='w-[28px] flex justify-between items-center'>
                  <span className='text-gray400'>{getValues('subItems').length}</span>
                  {showSubItems ? (
                    <FontAwesomeIcon icon={faChevronDown} className='text-PURPLE' fontSize={10} onClick={() => setShowSubItems(false)} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} className='text-PURPLE' fontSize={10} onClick={() => setShowSubItems(true)} />
                  )}
                </div>
              )}
            </div>
          </div>
          {showSubItems && (
            <Controller
              name='subItems'
              control={control}
              render={({ field }) => (
                <SubItems isActive={isActive} itemId={item.id} {...field} />
              )}
            />
          )}
        </div>
      </form>
    </ContextMenu>
  )
}

export default ItemForm;