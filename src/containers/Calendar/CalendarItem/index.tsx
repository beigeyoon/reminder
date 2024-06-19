import { Item } from "@/src/common/types";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateItemPayload, updateItem } from "@/src/services/item";
import Modal from "@/src/components/Modal";
import ItemInfo from "../../ModalContents/ItemInfo";
import { useListInfo } from "@/src/store/useListInfo";

const colorClassMap = {
  RED: 'bg-RED',
  ORANGE: 'bg-ORANGE',
  YELLOW: 'bg-YELLOW',
  GREEN: 'bg-GREEN',
  LIGHTBLUE: 'bg-LIGHTBLUE',
  BLUE: 'bg-BLUE',
  DEEPBLUE: 'bg-DEEPBLUE',
  PINK: 'bg-PINK',
  PURPLE: 'bg-PURPLE',
  BROWN: 'bg-BROWN',
  GRAY: 'bg-GRAY',
  PINKBEIGE: 'bg-PINKBEIGE',
};

interface ICalendarItem {
  item: Item;
}

const CalendarItem = ({ item }: ICalendarItem) => {
  const { lists } = useListInfo();

  const [isChecked, setIsChecked] = useState<boolean>(item.checked);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutateAsync: editItem } = useMutation({
    mutationFn: (body: UpdateItemPayload) => updateItem(body),
  });

  const onClickCheckbox = async (e: CheckboxChangeEvent) => {
    e.stopPropagation();
    const result = await editItem({
      id: item.id as string,
      checked: e.target.checked,
    });
    if (result.ok) {
      setIsChecked(e.target.checked);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getListInfo = (item: Item) => {
    const listInfo = lists?.find((list) => list.id === item.listId);
    return listInfo;
  };

  const listInfo = getListInfo(item);
  const itemColor = listInfo ? colorClassMap[listInfo.color] : "";

  return (
    <div className={`calendar-item bg-opacity-10 ${itemColor}`}>
      <div className={`min-w-[4px] h-[22px] ${itemColor}`} />
      {/* <Checkbox checked={isChecked} onChange={(e) => onClickCheckbox(e)} /> */}
      <div className='title hover:text-BLUE' onClick={handleModal}>{item.title}</div>
      <Modal isOpen={isModalOpen} close={handleModal}>
        <ItemInfo item={item} />
      </Modal>
    </div>
  );
}

export default CalendarItem;
