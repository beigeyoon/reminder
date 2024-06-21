import { PresetList, Item } from "@/src/common/types";
import ListButton from "./ListButton";
import { useListInfo } from "@/src/store/useListInfo";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/src/services/item";
import { useSession } from "next-auth/react";

interface IPresetListItem {
  list: PresetList;
}

const PresetListItem = ({ list }: IPresetListItem) => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;

  const { setSelectedList } = useListInfo();
  const { id, color, icon, name } = list;

  const { data: items } = useQuery({
    queryKey: ['getItems', id, userId],
    queryFn: () => getItems({
      listId: id,
      userId,
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