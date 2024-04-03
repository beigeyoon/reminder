'use client'
import ListButton from "./ListButton";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "@/src/services/list";

const Lists = () => {
  const { data } = useQuery({
    queryKey: ['getLists'],
    queryFn: () => getLists(),
  });

  return (
    <ListButton />
  )
}

export default Lists;