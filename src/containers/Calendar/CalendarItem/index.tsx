import { Item } from "@/src/types";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateItemPayload, updateItem } from "@/src/services/item";
import Modal from "@/src/components/Modal";
import ItemInfo from "../../ModalContents/ItemInfo";
import { useListInfo } from "@/src/store/useListInfo";

interface ICalendarItem {
  item: Item;
  onClickItemCheckbox: (itemId: string, isChecked: boolean) => void;
}

const CalendarItem = ({ item, onClickItemCheckbox }: ICalendarItem) => {
  const { lists } = useListInfo();

  const [isChecked, setIsChecked] = useState<boolean>(item.checked);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getListInfo = (item: Item) => {
    const listInfo = lists?.find((list) => list.id === item.listId);
    return listInfo;
  };

  const getItemColorClass = (item: Item) => {
    const listInfo = getListInfo(item);
    const itemColor = `bg-${listInfo?.color}`;
    return itemColor;
  };

  const itemColorClass = getItemColorClass(item);

  return (
    <div className='calendar-item'>
      <div className={`min-w-[6px] h-[16px] rounded-md ${itemColorClass}`} />
      <Checkbox checked={isChecked} onChange={(e) => onClickCheckbox(e)} />
      <div className='title hover:text-BLUE' onClick={handleModal}>{item.title}</div>
      <Modal isOpen={isModalOpen} close={handleModal}>
        <ItemInfo item={item} />
      </Modal>
    </div>
  )
}

export default CalendarItem;