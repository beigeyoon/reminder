import CircleIcon from "@/src/components/CircleIcon";
import { List } from "@/src/types";

interface IListButton {
  list: List;
}

const ListButton = ({ list }: IListButton) => {
  const { color, icon, name, items } = list;

  return (
    <button className='w-[123px] flex flex-col justify-between bg-gray200 rounded-xl p-[10px]'>
      <div className="w-full flex items-center justify-between">
        <CircleIcon iconName={icon} colorName={color} size='large' />
        <span className='font-bold text-lg'>{items?.length}</span>
      </div>
      <span className='font-bold mt-[8px]'>{name}</span>
    </button>
  )
}

export default ListButton;