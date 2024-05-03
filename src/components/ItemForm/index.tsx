'use client'

import { Item } from "@/src/types";
import { useState, useRef, useEffect } from "react";
import DateTime from "./DateTime";
import PrioritySelect from "./PrioritySelect";
import FlagButton from "./FlagButton";
import Tags from "./Tags";
import { Checkbox } from "antd";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { AddItemPayload, addItem } from "@/src/services/item";
import { useListInfo } from "@/src/store/useListInfo";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IItem {
  item: Item;
}

const ItemForm = ({ item }: IItem) => {
  const { listInfo } = useListInfo();
  const listId = listInfo?.id;
  
  const [isActive, setIsActive] = useState<boolean>(false);
  const itemFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemFormRef.current && !itemFormRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (body: AddItemPayload) => addItem(body),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checked: item?.checked,
      title: item?.title,
      memo: item?.memo || null,
      url: item?.url || null,
      priority: item?.priority,
      flagged: item?.flagged,
      tags: item?.tags,
      dateTime: item?.dateTime,
    }
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    createItem({
      listId,
      ...data,
    });
  };

  return (
    <form
      className="flex items-start gap-3"
      onClick={() => setIsActive(true)}
      onSubmit={handleSubmit(onSubmit)}
      ref={itemFormRef}
    >
      <Controller
        name='checked'
        control={control}
        render={({ field }) => (
          <Checkbox {...field} />
        )}
      />
      <div className='flex flex-col w-full'>
        <input id='title' {...register('title')} />
        <input id='memo' placeholder="메모" {...register('memo')} />
        <input id='url' placeholder="url" {...register('url')} />
        <Controller
          name='tags'
          control={control}
          render={({ field }) => (
            <Tags {...field} />
          )}
        />
        <div>
          <Controller
            name='dateTime'
            control={control}
            render={({ field }) => (
              <DateTime isActive={isActive} {...field} />
            )}
          />
          <Controller
            name='priority'
            control={control}
            render={({ field }) => (
              <PrioritySelect {...field} />
            )}
          />
          <Controller
            name='flagged'
            control={control}
            render={({ field }) => (
              <FlagButton {...field} />
            )}
          />
        </div>
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default ItemForm;