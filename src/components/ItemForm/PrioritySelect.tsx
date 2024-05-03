import { Select } from "antd";
import { Priority } from "@/src/enums";
import { forwardRef } from "react";
import { FieldValues } from "react-hook-form";

const PrioritySelect = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value } = props;
  
  const options = [
    {
      value: Priority.NO_PRIORITY,
      label: '없음',
    },
    {
      value: Priority.LOWER,
      label: '낮음',
    },
    {
      value: Priority.MIDDLE,
      label: '중간',
    },
    {
      value: Priority.UPPER,
      label: '높음',
    },
  ];

  return (
    <Select
      options={options}
      className='w-[100px]'
      defaultValue={Priority.NO_PRIORITY}
      {...props}
    />
  )
});

PrioritySelect.displayName = 'PrioritySelect';

export default PrioritySelect;