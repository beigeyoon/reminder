import { AddSubItemPayload, DeleteSubItemPayload, UpdateSubItemPayload, addSubItem, deleteSubItem, updateSubItem } from "@/src/services/subItem";
import { SubItem } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { MouseEvent, forwardRef, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ContextMenu, { ContextMenuItem } from "../ContextMenu";

const SubItems = forwardRef(({ ...props }: FieldValues) => {
  const { onChange, value: subItems, isActive, itemId } = props;

  const { mutateAsync: createSubItem } = useMutation({
    mutationFn: (body: AddSubItemPayload) => addSubItem(body),
  });

  const { mutateAsync: editSubItem } = useMutation({
    mutationFn: (body: UpdateSubItemPayload) => updateSubItem(body),
  });

  const { mutateAsync: removeSubItem } = useMutation({
    mutationFn: (body: DeleteSubItemPayload) => deleteSubItem(body),
  });

  const onClickAddSubItem = useCallback(async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const newSubItem = {
      itemId: itemId,
      title: '',
      checked: false,
    };
    const result = await createSubItem(newSubItem);
    if (result.ok) {
      const updatedSubItems = [ ...subItems, result.subItem ];
      onChange(updatedSubItems);
    } else {
      alert('서브 아이템 생성 에러');
      console.error(result.error);
    }
  }, [createSubItem, itemId, onChange, subItems]);

  const onUpdateTitle = useCallback(async (subItemId: string, newTitle: string) => {
    const result = await editSubItem({ id: subItemId, title: newTitle });
    if (result.ok) {
      const updatedSubItems = subItems.map((subItem: SubItem) => {
        if (subItem.id === subItemId) {
          subItem.title = newTitle;
        }
        return subItem;
      });
      onChange(updatedSubItems);
    } else {
      alert('서브 아이템 제목 업데이트 에러');
      console.error(result.error);
    }
  }, [editSubItem, onChange, subItems])

  const onChangeChecked = useCallback(async (e: CheckboxChangeEvent, subItem: SubItem) => {
    e.preventDefault();
    const result = await editSubItem({
      ...subItem,
      checked: !subItem.checked,
    });
    if (result.ok) {
      const updatedSubItems = subItems.map((subItem: SubItem) => {
        if (result.subItem.id === subItem.id) {
          subItem.checked = !subItem.checked;
        };
        return subItem;
      });
      onChange(updatedSubItems);
    } else {
      alert('서브 아이템 업데이트 에러');
      console.error(result.error);
    }
  }, [editSubItem, onChange, subItems]);

  const onDelete = useCallback(async (subItemId: string) => {
    const result = await removeSubItem({ id: subItemId });
    if (result.ok) {
      const updatedSubItems = subItems.filter((subItem: SubItem) => subItem.id !== result.subItem.id);
      onChange(updatedSubItems);
    } else {
      alert('서브 아이템 삭제 에러');
      console.error(result.error);
    }
  }, [onChange, removeSubItem, subItems]);

  return (
    <div className='w-full flex items-start'>
      {isActive && (
        <button
          onClick={(e) => onClickAddSubItem(e)}
          className='pt-[8px] pr-[8px]'
        >
          <FontAwesomeIcon icon={faPlus} className='text-gray400' />
        </button>
      )}
      <div className='w-full'>
        {subItems?.map((subItem: any) => (
          <SubItemComponemt
            key={subItem.id}
            subItem={subItem}
            onUpdateTitle={onUpdateTitle}
            onDelete={onDelete}
            onChangeChecked={onChangeChecked}
          />
        ))
        }
      </div>
    </div>
  )
});

SubItems.displayName = 'SubItems';

export default SubItems;

interface ISubItem {
  subItem: SubItem;
  onUpdateTitle: (subItemId: string, newTitle: string) => Promise<void>;
  onDelete: (subItemId: string) => Promise<void>;
  onChangeChecked: (e: CheckboxChangeEvent, subItem: SubItem) => Promise<void>;
}

const SubItemComponemt = ({ subItem, onUpdateTitle, onDelete, onChangeChecked }: ISubItem) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, subItem: SubItem) => {
    if (e.key === 'Enter') {
      onUpdateTitle(subItem.id, e.currentTarget.value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, subItem: SubItem) => {
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