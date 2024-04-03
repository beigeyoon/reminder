import SearchInput from "@/components/Sidebar/SearchInput";
import AddListButton from "./AddListButton";
import Lists from "./Lists";

const Sidebar = () => {
  return (
    <div className='w-[280px] h-screen p-[12px] bg-gray100 text-gray500'>
      <SearchInput />
      <Lists />
      <AddListButton />
    </div>
  )
}

export default Sidebar;