'use client'
import { Calendar as ReactCalendar, TileContentFunc } from 'react-calendar';
import dayjs from 'dayjs';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import { getItems } from '@/src/services/item';
import { useListInfo } from '@/src/store/useListInfo';
import { useState } from 'react';
import { Item } from '@/src/types';
import CalendarItem from './CalendarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface ICalendar {
  onClickItemCheckbox: (itemId: string, isChecked: boolean) => void;
}

const Calendar = ({ onClickItemCheckbox }: ICalendar) => {
  const { listInfo } = useListInfo();

  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const { data: items, isLoading } = useQuery({
    enabled: !!listInfo?.id,
    queryKey: ['getItems', activeDate],
    queryFn: () => getItems({
      listId: listInfo!.id,
      year: dayjs(activeDate).year(),
      month: dayjs(activeDate).month() + 1,
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
        <CalendarItem item={item} onClickItemCheckbox={onClickItemCheckbox} />
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