import { PriorityIcon } from './PriorityIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { useListInfo } from '@/src/store/useListInfo';
import { useCallback } from 'react';

interface IUnactiveItem {
  item: any;
}

const UnactiveItem = ({ item }: IUnactiveItem) => {
  const { lists, selectedList } = useListInfo();

  const addProtocolToUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    } else {
      return 'https://' + url;
    }
  }

  const isOverdue = (dateTime: string) => {
    return dayjs(dateTime).isBefore(dayjs().startOf('day'));
  }

  const dateTimeColorStyle = {
    isOverdue: 'text-RED',
    isNotOverdue: 'text-gray400',
  }

  const getListNameFromListId = useCallback((listId: string) => {
    const list = lists?.find((list) => list.id === listId);
    return list?.name;
  }, [lists]);
  
  return (
    <div className='flex flex-col leading-[22px]'>
      <div className='flex'>
        <PriorityIcon priority={item.priority!} />
        <div>{item.title}</div>
        {(selectedList?.id === 'today-list' || selectedList?.id === 'scheduled-list' || selectedList?.id === 'checked-list') && (
          <div className='pl-[4px] text-gray300'>{getListNameFromListId(item.listId)}</div>
        )}
      </div>
      {item.memo && <div className='text-gray400'>{item.memo}</div>}
      {item.url && <div className='text-blue'>
        <FontAwesomeIcon icon={faLink} fontSize={10} className='mr-[4px]' />
        <a className='underline' href={addProtocolToUrl(item.url)} target='_blank'>{item.url}</a>
      </div>}
      {item.tags.length > 0 && (
        <div>
          {item.tags.map((tag: string, index: number) => (
            <span key={index} className='inline-block mr-[4px] text-DEEPBLUE text-[12px]'>
              {`#${tag}`}
            </span>
          ))}
        </div>
      )}
      {item.dateTime && (
        <div className={`inline-block ${dateTimeColorStyle[isOverdue(item.dateTime) ? 'isOverdue' : 'isNotOverdue']}`}>
          {dayjs(item.dateTime).format('YYYY. M. D.')}
          {item.hasTime && ' ' + dayjs(item.dateTime).format('A h:mm')}
        </div>
      )}
    </div>
  )
}

export default UnactiveItem;