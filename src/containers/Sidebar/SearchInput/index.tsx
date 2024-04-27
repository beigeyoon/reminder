import Input from "@/src/components/Input";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = () => {
  return (
    <div className='relative'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute ml-[6px] mt-[5px]' fontSize={14} />
      <Input className='rounded-md border-[0.5px] w-full bg-gray200/80 border-gray200 pl-[24px] pr-[4px] py-[5px] text-sm' placeholder='Search' />
    </div>
    
  )
}

export default SearchInput;