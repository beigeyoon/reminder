import { AddSubItemPayload, DeleteSubItemPayload, UpdateSubItemPayload, addSubItem, deleteSubItem, updateSubItem } from "@/src/services/subItem";
import { SubItem } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { MouseEvent, forwardRef, useCallback } from "react";
import { FieldValues } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
      title: 'new subItem',
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

  const onDelete = useCallback(async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, subItemId: string) => {
    e.preventDefault();
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
    <div className='flex'>
      {isActive && (
        <button onClick={(e) => onClickAddSubItem(e)}>+</button>
      )}
      <div>
        {subItems?.map((subItem: any) => (
          <div key={subItem?.id}>
            {isActive && (
              <Checkbox checked={subItem?.checked} onChange={(e) => onChangeChecked(e, subItem)} />
            )}
            <span>{subItem?.title}</span>
            {isActive && (
              <button onClick={(e) => onDelete(e, subItem.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
});

SubItems.displayName = 'SubItems';

export default SubItems;