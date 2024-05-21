import { PriorityIcon } from './PriorityIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';

interface IUnactiveItem {
  item: any;
}

const UnactiveItem = ({ item }: IUnactiveItem) => {
  const addProtocolToUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    } else {
      return 'https://' + url;
    }
  }

  return (
    <div className='flex flex-col leading-[22px]'>
      <div className='flex'>
        <PriorityIcon priority={item.priority!} />
        <div>{item.title}</div>
      </div>
      {item.memo && <div className='text-gray400'>{item.memo}</div>}
      {item.url && <div className='text-blue'>
        <FontAwesomeIcon icon={faLink} fontSize={10} className='mr-[4px]' />
        <a className='underline' href={addProtocolToUrl(item.url)} target='_blank'>{item.url}</a>
      </div>}
      {item.tags.length > 0 && (
        <div>
          {item.tags.map((tag: string, index: number) => (
            <span key={index} className='inline-block mr-[4px] text-blue text-[12px]'>
              {`#${tag}`}
            </span>
          ))}
        </div>
      )}
      {item.dateTime && (
        <div className='inline-block text-gray400'>
          {dayjs(item.dateTime).format('YYYY. M. D.')}
          {item.hasTime && ' ' + dayjs(item.dateTime).format('A h:mm')}
        </div>
      )}
    </div>
  )
}

export default UnactiveItem;