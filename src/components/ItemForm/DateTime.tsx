'use client'
import { DatePicker, DatePickerProps, TimePicker, TimePickerProps } from "antd";
import { forwardRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import dayjs from "dayjs";
import { useController } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { toKoreanTime } from "@/src/utils/toKoreanTime";

const DateTime = forwardRef(({ ...props }: FieldValues) => {
  const { onChange: onChangeDateTime, value, control } = props;

  const [timeSectionIsVisible, setTimeSectionIsVisible] = useState<boolean>(!!value);

  const { field: {
    onChange: onChangeHasTime,
    value: hasTimeValue,
    }
  } = useController({ name: 'hasTime', control });

  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setTimeSectionIsVisible(date ? true : false);
    const koreaTimeDate = toKoreanTime(date);
    onChangeDateTime(koreaTimeDate);
  };
  const onChangeTime: TimePickerProps['onChange'] = (time) => {
    if (time) {
      const koreaTimeDateTime = toKoreanTime(time);
      onChangeDateTime(koreaTimeDateTime);
    } else {
      onChangeHasTime(false);
      const timeInitializedDateTime = toKoreanTime(dayjs(value).startOf('day'));
      onChangeDateTime(timeInitializedDateTime);
    }
  };

  const onClickAddTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChangeHasTime(true);
  }

return (
    <div className='flex gap-3 h-[28px]'>
      <DatePicker
        placeholder='날짜 추가'
        variant="filled"
        className='w-[130px]'
        onChange={onChangeDate}
        defaultValue={value ? toKoreanTime(dayjs(value)) : null}
        format={'YYYY. M. D.'}
        getPopupContainer={(trigger) => trigger}
      />
      {timeSectionIsVisible && (
        hasTimeValue ? (
          <TimePicker
            variant='filled'
            className='w-[110px]'
            onChange={onChangeTime}
            defaultValue={value ? toKoreanTime(dayjs(value)) : null}
            format={'A h:mm'}
            getPopupContainer={(trigger) => trigger}
          />
        ) : (
          <button
            onClick={(e) => onClickAddTime(e)}
            className='cursor-pointer px-[6px] text-[12px] leading-[22px] bg-gray10 rounded text-gray400 flex items-center gap-[4px]'
          >
            <FontAwesomeIcon icon={faClock} fontSize={12} />
            시간 추가
          </button>
        )
      )}
    </div>
  )
});

DateTime.displayName = 'DateTime';

export default DateTime;