'use client'
import { Calendar as ReactCalendar, TileContentFunc } from 'react-calendar';
import dayjs from 'dayjs';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/src/services/item';
import { useState } from 'react';
import { Item } from '@/src/common/types';
import CalendarItem from './CalendarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useListInfo } from '@/src/store/useListInfo';
import { useSession } from "next-auth/react";

const Calendar = () => {
  const { status, data: session } = useSession();
  const userId = session?.user?.id;

  const { selectedList } = useListInfo();

  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const { data: items, isLoading } = useQuery({
    queryKey: ['getItems', selectedList?.id, activeDate, userId],
    queryFn: () => getItems({
      listId: selectedList?.id as string,
      year: dayjs(activeDate).year(),
      month: dayjs(activeDate).month() + 1,
      userId,
    }),
    select: (data) => {
      return groupItemsByDate(data);
    }
  });

  const appendTileContent: TileContentFunc = ({ activeStartDate, date, view }) => {
    const tileDate = dayjs(date).date().toString();
    const tileItems = items?.[tileDate];
    
    return <div className='w-[-webkit-fill-available]'>
      {tileItems?.map((item) => (
        <CalendarItem key={item.id} item={item} />
      ))}
    </div>
  }

  function groupItemsByDate(items: Item[]): Record<string, Item[]> {
    return items.reduce<Record<string, Item[]>>((acc, item) => {
      const date = dayjs(item.dateTime).date().toString();
      if (acc[date]) {
        acc[date].push(item);
      } else {
        acc[date] = [item];
      }
      return acc;
    }, {});
  }

  return (
    <ReactCalendar
      locale='ko'
      formatDay={(_, date) => dayjs(date).format('D')}
      showNeighboringMonth={false}
      nextLabel={<FontAwesomeIcon icon={faAngleRight} fontSize={22} />}
      prevLabel={<FontAwesomeIcon icon={faAngleLeft} fontSize={22} />}
      next2Label={null}
      prev2Label={null}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) setActiveDate(activeStartDate);
      }}
      tileContent={appendTileContent}
      calendarType='gregory'
    />
  )
}

export default Calendar;