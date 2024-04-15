import CircleIcon from "@/src/components/CircleIcon";
import { List } from "@/src/types";
import { deleteList } from "@/src/services/list";
import ContextMenu from "@/src/components/ContextMenu";

interface IListButton {
  list: List;
}

const ListButton = ({ list }: IListButton) => {
  const { id, color, icon, name, items } = list;

  return (
    <ContextMenu
      id={`list-button-${id}`}
      items={[
        {
          id: 'entry-1',
          caption: 'this is the first entry',
          onClick: () => alert('hello!'),
        }
      ]}
    >
      <button
        className='w-[123px] flex flex-col justify-between bg-gray200 rounded-xl p-[10px]'
      >
        <div className="w-full flex items-center justify-between">
          <CircleIcon iconName={icon} colorName={color} size='large' />
          <span className='font-bold text-lg'>{items?.length}</span>
        </div>
        <span className='font-bold mt-[8px]'>{name}</span>
      </button>
    </ContextMenu>
    
  )
}

export default ListButton;