'use client'
import Input from "@/src/components/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useControl } from '@/src/store/useControl';

const SearchInput = () => {
  const { setSelectedTag, setSearchKeyword } = useControl();

  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (inputValue.length > 0) {
        setSelectedTag(null)
        setSearchKeyword(inputValue);
        setInputValue('');
      }
    }
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='relative'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute ml-[6px] mt-[5px]' fontSize={14} />
      <Input
        className='rounded-md border-[0.5px] w-full bg-gray200/80 border-gray200 pl-[24px] pr-[4px] py-[5px] text-sm'
        placeholder='Search'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
    
  )
}

export default SearchInput;