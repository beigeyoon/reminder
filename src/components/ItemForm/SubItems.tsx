import { AddSubItemPayload, DeleteSubItemPayload, UpdateSubItemPayload, addSubItem, deleteSubItem, updateSubItem } from "@/src/services/subItem";
import { useMutation } from "@tanstack/react-query";
import { forwardRef } from "react";
import { FieldValues } from "react-hook-form";

const SubItems = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value: subItems, isActive, itemId } = props;

  const dummy = {
    itemId: itemId,
    title: '새로운 하위 항목',
    checked: false,
  }

  const { mutateAsync: createSubItem } = useMutation({
    mutationFn: (body: AddSubItemPayload) => addSubItem(body),
  });

  const { mutateAsync: editSubItem } = useMutation({
    mutationFn: (body: UpdateSubItemPayload) => updateSubItem(body),
  });

  const { mutateAsync: removeSubItem } = useMutation({
    mutationFn: (body: DeleteSubItemPayload) => deleteSubItem(body),
  });

  return (
    <button onClick={() => createSubItem(dummy)}>+ 서브아이템</button>
  )
});

SubItems.displayName = 'SubItems';

export default SubItems;