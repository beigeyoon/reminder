import { Select } from "antd";
import { Priority } from "@/src/enums";
import { FieldValues } from "react-hook-form";

const  PrioritySelect = ({ ...props }: FieldValues) => {
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
    <div onClick={e => e.stopPropagation()}>
      <Select
        options={options}
        className='w-[100px] h-[28px]'
        defaultValue={Priority.NO_PRIORITY}
        getPopupContainer={(trigger) => trigger}
        {...props}
      />
    </div>
  )
};

export default PrioritySelect;