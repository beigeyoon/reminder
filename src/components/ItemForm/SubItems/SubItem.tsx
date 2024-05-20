import { SubItem as SubItemType } from "@/src/types";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import ContextMenu, { ContextMenuItem } from "../../ContextMenu";

interface ISubItem {
  subItem: SubItemType;
  onUpdateTitle: (subItemId: string, newTitle: string) => Promise<void>;
  onDelete: (subItemId: string) => Promise<void>;
  onChangeChecked: (e: CheckboxChangeEvent, subItem: SubItemType) => Promise<void>;
}

const SubItem = ({ subItem, onUpdateTitle, onDelete, onChangeChecked }: ISubItem) => {
  const menuItems: ContextMenuItem[] = [
    {
      id: 'delete-list',
      caption: '서브 아이템 삭제',
      type: 'normal',
      onClick: () => {
        onDelete(subItem.id);
      },
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, subItem: SubItemType) => {
    if (e.key === 'Enter') {
      onUpdateTitle(subItem.id, e.currentTarget.value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, subItem: SubItemType) => {
    onUpdateTitle(subItem.id, e.currentTarget.value);
  };

  return (
    <ContextMenu
      id={`subItem-form-${subItem.id}`}
      items={menuItems}
      width={160}
      key={subItem.id}
    >
      <div key={subItem?.id} className='flex items-center gap-3'>
        <Checkbox
          className='leading-[16px]'
          checked={subItem?.checked}
          onChange={(e) => onChangeChecked(e, subItem)}
        />
        <span className='w-full border-b border-gray100 py-[8px]'>
          <input
            id='subItem-title'
            defaultValue={subItem.title}
            onKeyDown={(e) => handleKeyDown(e, subItem)}
            onBlur={(e) => handleBlur(e, subItem)}
          />
        </span>
      </div>
    </ContextMenu>
  )
}

export default SubItem;