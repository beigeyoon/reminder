'use client'

import { Item } from "@/src/types";
import { useState } from "react";
import DateTime from "./DateTime";
import PrioritySelect from "./PrioritySelect";
import FlagButton from "./FlagButton";
import Tags from "./Tags";

interface IItem {
  item?: Item;
}

const ItemForm = ({ item }: IItem) => {
  // 타이틀, 메모, 태그, url, 우선순위, 날짜, 시간, 깃발, 서브아이템
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div onClick={() => setIsActive(true)} className='flex flex-col'>
      <input id='title' placeholder="새로운 아이템" />
      <input id='memo' placeholder="메모" />
      <Tags />
      <input id='url' placeholder="url" />
      <div>
        <DateTime />
        <PrioritySelect />
        <FlagButton />
      </div>
    </div>
  )
}

export default ItemForm;