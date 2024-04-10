'use client'
import ListButton from "./ListButton";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "@/src/services/list";
import { List } from "@/src/types";
import { useSession } from "next-auth/react";

const Lists = () => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;
  
  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ['getLists', userId],
    queryFn: () => getLists({ userId }),
  });
  
  if (isLoading) return <></>;
  return (
    <div className='mt-[20px]'>
      {data?.map((item: List) => (
        <ListButton key={item.id} list={item} />
      ))}
    </div>
  )
}

export default Lists;