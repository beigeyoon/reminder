import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddListButton = () => {
  return (
    <div className='flex items-center gap-2'>
      <FontAwesomeIcon icon={faCirclePlus} fontSize={14} />
      <span>목록 추가</span>
    </div>
  )
}

export default AddListButton;