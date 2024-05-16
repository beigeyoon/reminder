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
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import SubItems from "./SubItems";

interface IItemForm {
  item: Item;
  onClickDeleteItem: (itemId: string) => void;
}

const ItemForm = ({ item, onClickDeleteItem }: IItemForm) => {
  const isNewItem = item.id === undefined;
  const { listInfo } = useListInfo();
  const listId = listInfo?.id;
  
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

  const onDelete = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, itemId: string) => {
    e.preventDefault();
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

  return (
    <form
      className="flex items-start gap-3"
      ref={itemFormRef}
    >
      <Controller
        name='checked'
        control={control}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value} />
        )}
      />
      <div className='flex flex-col w-full' onClick={() => setIsActive(true)}>
        <input id='title' {...register('title')} />
        {(isActive || getValues('memo')) && <input id='memo' placeholder="메모" {...register('memo')} />}
        {(isActive || getValues('url')) && <input id='url' placeholder="url" {...register('url')} />}
        <Controller
          name='tags'
          control={control}
          render={({ field }) => (
            <Tags isActive={isActive} {...field} />
          )}
        />
        <div>
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
          <Controller
            name='subItems'
            control={control}
            render={({ field }) => (
              <SubItems isActive={isActive} itemId={item.id} {...field} />
            )}
          />
        </div>
      </div>
      {isActive && (
        <button onClick={(e) => onDelete(e, item.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      )}
    </form>
  )
}

export default ItemForm;