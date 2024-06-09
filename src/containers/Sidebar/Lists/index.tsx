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

const Lists = () => {
  const { selectedList, setSelectedList, setLists } = useListInfo();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ['getLists'],
    queryFn: () => getLists({ userId }),
  });

  useEffect(() => {
    if (data) {
      setLists(data);
      const currentList = data.find((item) => item.id === selectedList?.id);
      if (!currentList) {
        setSelectedList(data[0]);
      } else {
        setSelectedList(currentList);
      }
    }
  }, [data, selectedList, setLists, setSelectedList]);
  
  if (isLoading) return <></>;
  return (
    <div className='grid grid-cols-2 gap-[10px]'>
      {data?.map((item: List) => (
        <ListItem key={item.id} list={item} />
      ))}
      {presetLists.map((item: PresetList) => (
        <PresetListItem key={item.id} list={item} />
      ))}
    </div>
  )
}

export default Lists;