'use client'

import { Item } from "@/src/types";
import { useState } from "react";
import DateTime from "./DateTime";
import PrioritySelect from "./PrioritySelect";
import FlagButton from "./FlagButton";
import Tags from "./Tags";
import { Input, Checkbox } from "antd";

interface IItem {
  item?: Item;
}

const ItemForm = ({ item }: IItem) => {
  // 타이틀, 메모, 태그, url, 우선순위, 날짜, 시간, 깃발, 서브아이템
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="flex items-start gap-3"
      onClick={() => setIsActive(true)}
    >
      <Checkbox />
      <div className='flex flex-col w-full'>
        <Input id='title' placeholder="새로운 아이템" />
        <Input id='memo' placeholder="메모" />
        <Input id='url' placeholder="url" />
        <Tags />
        <div>
          <DateTime />
          <PrioritySelect />
          <FlagButton isActive={false} />
        </div>
      </div>
    </div>
    
  )
}

export default ItemForm;