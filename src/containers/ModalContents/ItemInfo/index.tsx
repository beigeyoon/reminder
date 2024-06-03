import Button from "@/src/components/Button";
import UnactiveItem from "@/src/components/ItemForm/UnactiveItem";
import { Item } from "@/src/common/types";
import { getTagsArray } from "@/src/utils/getTagsArray";

interface IEditItem {
  item: Item;
  close?: () => void;
}

const ItemInfo = ({ item, close }: IEditItem) => {
  return (
    <div className='w-[240px] flex flex-col justify-end gap-[10px]'>
      <UnactiveItem item={{ ...item, tags: getTagsArray(item.tags) }} />
      <Button onClick={close}>확인</Button>
    </div>
  )
}

export default ItemInfo;