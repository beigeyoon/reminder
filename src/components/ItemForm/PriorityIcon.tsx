import { Priority } from '@/src/common/enums';

interface IPriorityInTitle {
  priority: Priority;
}

export const PriorityIcon = ({ priority }: IPriorityInTitle) => {
  if (priority === Priority.NO_PRIORITY) return null;
  else return (
    <span className='text-PURPLE mr-1'>
      {priority === Priority.LOWER ?
        '!'
        : priority === Priority.MIDDLE ?
        '!!'
        : '!!!'
      }
    </span>
  )
};