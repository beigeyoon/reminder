import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListButton = () => {
  return (
    <button className='flex bg-gray200'>
      <div className="flex flex-col">
        <FontAwesomeIcon icon={faListUl} className='text-pink' />
        <span>TO DO</span>
      </div>
      <div>9</div>
    </button>
  )
}

export default ListButton;