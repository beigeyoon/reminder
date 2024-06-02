'use client'
import ListButton from "./ListButton";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "@/src/services/list";
import { List } from "@/src/types";
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useListInfo } from '@/src/store/useListInfo';

const Lists = () => {
  const { setSelectedList, setLists } = useListInfo();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ['getLists'],
    queryFn: () => getLists({ userId }),
  });

  useEffect(() => {
    if (data) {
      setSelectedList(data[0]);
      setLists(data);
    }
  }, [data]);
  
  if (isLoading) return <></>;
  return (
    <div className='grid grid-cols-2 gap-[10px]'>
      {data?.map((item: List) => (
        <ListButton key={item.id} list={item} />
      ))}
    </div>
  )
}

export default Lists;