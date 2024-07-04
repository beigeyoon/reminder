'use client'
import Input from "@/src/components/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useControl } from '@/src/store/useControl';

const SearchInput = () => {
  const { setSelectedTag, setSearchKeyword } = useControl();

  const [isComposing, setIsComposing] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !isComposing) {
      if (inputRef.current && inputRef.current.value.length > 0) {
        setSelectedTag(null);
        setSearchKeyword(inputRef.current.value);
        inputRef.current.value = '';
      }
    }
  };

  const handleComposition = (event: any) => {
    if (event.type === "compositionstart") {
      setIsComposing(true);
    } else if (event.type === "compositionend") {
      setIsComposing(false);
      handleKeyDown(event);
    }
  };

  return (
    <div className='relative'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute ml-[6px] mt-[5px]' fontSize={14} />
      <Input
        className='rounded-md border-[0.5px] w-full bg-gray200/80 border-gray200 pl-[24px] pr-[4px] py-[5px] text-sm'
        placeholder='Search'
        onKeyDown={handleKeyDown}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        ref={inputRef}
      />
    </div>
  )
}

export default SearchInput;