'use client'
import ListButton from "./ListButton";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "@/src/services/list";
import { List } from "@/src/types";

const Lists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getLists'],
    queryFn: () => getLists(),
  });
  
  if (isLoading) return <></>;
  return (
    <div className='mt-[20px]'>
      {data.map((item: List) => (
        <ListButton key={item.id} list={item} />
      ))}
    </div>
  )
}

export default Lists;