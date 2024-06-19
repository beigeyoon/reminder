import { PresetList, Item } from "@/src/common/types";
import { useState } from "react";
import ListButton from "./ListButton";
import { useListInfo } from "@/src/store/useListInfo";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/src/services/item";

interface IPresetListItem {
  list: PresetList;
}

const PresetListItem = ({ list }: IPresetListItem) => {
  const { setSelectedList } = useListInfo();
  const { id, color, icon, name } = list;

  const { data: items } = useQuery({
    queryKey: ['getItems', id],
    queryFn: () => getItems({
      listId: id,
    })
  })

  const selectList = () => {
    setSelectedList({ ...list, items: items as Item[] });
  };

  if (items) return (
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