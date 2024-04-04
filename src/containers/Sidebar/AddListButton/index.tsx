import { ListType, Icon, Color } from "@/src/enums";
import { addList, AddListPayload } from "@/src/services/list";
import { List } from "@/src/types";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";

const AddListButton = () => {
  const dummy = {
    name: '스케쥴',
    type: 'STANDARD',
    icon: 'BOOK',
    color: 'GREEN',
  };

  const onClick = () => {
    
  };

  return (
    <div className='flex items-center gap-2'>
      <FontAwesomeIcon icon={faCirclePlus} fontSize={14} />
      <span>목록 추가</span>
    </div>
  )
}

export default AddListButton;