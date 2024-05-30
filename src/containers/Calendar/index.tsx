'use client'
import { Calendar as ReactCalendar } from 'react-calendar';
import dayjs from 'dayjs';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/src/services/item';
import { useListInfo } from '@/src/store/useListInfo';
import { useState } from 'react';

const Calendar = () => {
  const { listInfo } = useListInfo();

  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const { data: items, isLoading } = useQuery({
    enabled: !!listInfo?.id,
    queryKey: ['getItems', activeDate],
    queryFn: () => getItems({
      listId: listInfo!.id,
      year: dayjs(activeDate).year(),
      month: dayjs(activeDate).month() + 1,
    })
  });

  return (
    <ReactCalendar
      formatDay={(_, date) => dayjs(date).format('D')}
      showNeighboringMonth={false}
      next2Label={null}
      prev2Label={null}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) setActiveDate(activeStartDate);
      }}
    />
  )
}

export default Calendar;