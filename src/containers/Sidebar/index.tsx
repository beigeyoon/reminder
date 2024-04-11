import SearchInput from "@/src/containers/Sidebar/SearchInput";
import AddListButton from "./AddListButton";
import Lists from "./Lists";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className='w-[280px] h-screen p-[12px] bg-gray100 text-gray500 flex flex-col justify-between'>
      <div className='flex flex-col gap-[16px]'>
        <LogoutButton />
        <SearchInput />
        <Lists />
      </div>
      <AddListButton />
    </div>
  )
}

export default Sidebar;