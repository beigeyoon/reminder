'use client'
import ListItem from "./ListItem";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "@/src/services/list";
import { List, PresetList } from "@/src/common/types";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useListInfo } from '@/src/store/useListInfo';
import { presetLists } from "@/src/common/constants";
import PresetListItem from "./ListItem/PresetListItem";
import { orderLists } from "@/src/utils/orderData";

const Lists = () => {
  const { selectedList, setSelectedList, setLists } = useListInfo();
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  
  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ['getLists'],
    queryFn: () => getLists({ userId }),
  });

  useEffect(() => {
    if (data) {
      setLists(data);
      const isFirstRender = !selectedList?.id;
      const hasNoList = data.length === 0;

      if (isFirstRender) {
        if (hasNoList) {
          setSelectedList(presetLists[0]);
        } else {
          setSelectedList(data[0]);
        }
      } else {
        const isPresetList = presetLists.find((item) => item.id === selectedList?.id);
        const isUserMadeList = data.find((item) => item.id === selectedList?.id);
        setSelectedList(isPresetList as PresetList || isUserMadeList || data[0] || presetLists[0]);
      }
    }
  }, [data, setLists, setSelectedList]);
  
  if (isLoading) return <></>;
  return (
    <div className='grid grid-cols-2 gap-[10px]'>
      {orderLists(data || []).map((item: List) => (
        <ListItem key={item.id} list={item} />
      ))}
      {presetLists.map((item: PresetList) => (
        <PresetListItem key={item.id} list={item} />
      ))}
    </div>
  )
}

export default Lists;