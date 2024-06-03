import { PresetList, Item } from "@/src/common/types";
import { useState } from "react";
import ListButton from "./ListButton";
import { useListInfo } from "@/src/store/useListInfo";

interface IPresetListItem {
  list: PresetList;
}

const PresetListItem = ({ list }: IPresetListItem) => {
  const { setSelectedList } = useListInfo();
  const [items, setItems] = useState<Item[]>([]);
  const { color, icon, name } = list;

  const selectList = () => {
    setSelectedList(list);
  };

  return (
    <ListButton
      name={name}
      icon={icon}
      color={color}
      items={items}
      selectList={selectList}
    />
  )
}

export default PresetListItem;