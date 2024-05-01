'use client'
import { DatePicker, DatePickerProps, TimePickerProps } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [dateTime, setDateTime] = useState<Dayjs | null>(null);

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setDate(date);
  };
  const onChangeTime: TimePickerProps['onChange'] = (dateTime) => {
    setDateTime(dateTime);
  };
  
  return (
    <div>
      <DatePicker
        placeholder='날짜 추가'
        variant="filled"
        className='w-[130px]'
        onChange={onChangeDate}
      />
      {date && (
        <DatePicker
          placeholder='시간 추가'
          variant='filled'
          className='w-[100px]'
          picker="time"
          onChange={onChangeTime}
        />
      )}
    </div>
  )
}

export default DateTime;