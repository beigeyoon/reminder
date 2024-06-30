import { Color, Icon } from "@/src/common/enums";
import { Item } from "@/src/common/types";
import CircleIcon from "@/src/components/CircleIcon";

interface IListButton {
  name: string;
  icon: keyof typeof Icon;
  color: keyof typeof Color;
  items: Item[];
  selectList: () => void;
}

const ListButton = ({ name, icon, color, items, selectList }: IListButton) => {
  return (
    <button
      className='w-[123px] flex flex-col justify-between bg-gray200 rounded-xl p-[10px]'
      onClick={selectList}
    >
      <div className="w-full flex items-center justify-between">
        <CircleIcon iconName={icon} colorName={color} size='large' />
        <span className='font-bold text-lg'>{items?.length}</span>
      </div>
      <span className='font-bold mt-[8px] overflow-hidden whitespace-nowrap text-ellipsis w-full text-left leading-[1.2]'>{name}</span>
    </button>  
  )
}

export default ListButton;