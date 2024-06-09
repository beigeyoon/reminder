import { AddSubItemPayload, DeleteSubItemPayload, UpdateSubItemPayload, addSubItem, deleteSubItem, updateSubItem } from "@/src/services/subItem";
import { SubItem as SubItemType } from "@/src/common/types";
import { useMutation } from "@tanstack/react-query";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { MouseEvent, forwardRef, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SubItem from "./SubItem";

const SubItems = forwardRef(({ ...props }: FieldValues) => {
  const { onChange, value: subItems, isActive, itemId, showSubItems, handleSubItemsToggle } = props;

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
      handleSubItemsToggle();
    } else {
      alert('서브 아이템 생성 에러');
      console.error(result.error);
    }
  }, [createSubItem, handleSubItemsToggle, itemId, onChange, subItems]);

  const onUpdateTitle = useCallback(async (subItemId: string, newTitle: string) => {
    const result = await editSubItem({ id: subItemId, title: newTitle });
    if (result.ok) {
      const updatedSubItems = subItems.map((subItem: SubItemType) => {
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

  const onChangeChecked = useCallback(async (e: CheckboxChangeEvent, subItem: SubItemType) => {
    e.preventDefault();
    const result = await editSubItem({
      ...subItem,
      checked: !subItem.checked,
    });
    if (result.ok) {
      const updatedSubItems = subItems.map((subItem: SubItemType) => {
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
      const updatedSubItems = subItems.filter((subItem: SubItemType) => subItem.id !== result.subItem.id);
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
      {showSubItems && (
        <div className='w-full'>
        {subItems?.map((subItem: any) => (
          <SubItem
            key={subItem.id}
            subItem={subItem}
            onUpdateTitle={onUpdateTitle}
            onDelete={onDelete}
            onChangeChecked={onChangeChecked}
          />
        ))
        }
      </div>
      )}
    </div>
  )
});

SubItems.displayName = 'SubItems';

export default SubItems;