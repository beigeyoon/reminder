import { Item } from "@/src/types";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateItemPayload, updateItem } from "@/src/services/item";

interface ICalendarItem {
  item: Item;
  onClickItemCheckbox: (itemId: string, isChecked: boolean) => void;
}

const CalendarItem = ({ item, onClickItemCheckbox }: ICalendarItem) => {
  const [isChecked, setIsChecked] = useState<boolean>(item.checked);

  const { mutateAsync: editItem } = useMutation({
    mutationFn: (body: UpdateItemPayload) => updateItem(body),
  });

  const onClickCheckbox = async (e: CheckboxChangeEvent) => {
    e.stopPropagation();
    const result = await editItem({
      id: item.id,
      checked: e.target.checked,
    });
    if (result.ok) {
      setIsChecked(e.target.checked);
      onClickItemCheckbox(item.id, e.target.checked);
    };
  };

  return (
    <div className='calendar-item'>
      <Checkbox checked={isChecked} onChange={(e) => onClickCheckbox(e)} />
      <div className='title'>{item.title}</div>
    </div>
  )
}

export default CalendarItem;