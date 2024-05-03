'use client'
import { DatePicker, DatePickerProps, TimePickerProps } from "antd";
import { forwardRef } from "react";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";

const DateTime = forwardRef(({ ...props }: FieldValues) => {
  const { isActive, name, onBlur, onChange, value } = props;

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    onChange(date);
  };
  const onChangeTime: TimePickerProps['onChange'] = (time) => {
    // 시간 선택시 dateTime 업데이트
  };

  return (
    <div>
      <DatePicker
        placeholder='날짜 추가'
        variant="filled"
        className='w-[130px]'
        onChange={onChangeDate}
        defaultValue={value ? dayjs(value) : null}
      />
    </div>
  )
});

DateTime.displayName = 'DateTime';

export default DateTime;