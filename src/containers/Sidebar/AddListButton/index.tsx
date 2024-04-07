'use client'
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddList from "../../ModalContents/AddList";
import Modal from "@/src/components/Modal";
import { useMutation } from "@tanstack/react-query";
import { addList, AddListPayload } from "@/src/services/list";

const AddListButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dummy = {
    name: '스케쥴',
    type: 'STANDARD',
    icon: 'BOOK',
    color: 'GREEN',
    user: 'yooni',
  };

  const { mutateAsync: createList } = useMutation({
    mutationFn: () => addList(dummy as AddListPayload),
  });

  const onSubmit = () => {
    createList();
  };

  const onClickButton = () => {
    handleModal();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='flex items-center gap-2' onClick={onClickButton}>
        <FontAwesomeIcon icon={faCirclePlus} fontSize={14} />
        <span>목록 추가</span>
      </div>
      <Modal isOpen={isModalOpen} close={handleModal} submit={onSubmit}>
        <AddList />
      </Modal>
    </>
  )
}

export default AddListButton;