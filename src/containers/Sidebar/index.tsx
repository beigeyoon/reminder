import SearchInput from "@/src/containers/Sidebar/SearchInput";
import AddListButton from "./AddListButton";
import Lists from "./Lists";
import UserButton from './UserButton';
import TagsFilter from "./TagsFilter";


const Sidebar = () => {
  return (
    <div className='w-[280px] h-screen p-[12px] bg-gray100 text-gray500 flex flex-col justify-between'>
      <div className='flex flex-col gap-[16px]'>
        <UserButton />
        <SearchInput />
        <Lists />
        <TagsFilter />
      </div>
      <AddListButton />
    </div>
  )
}

export default Sidebar;