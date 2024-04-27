'use client'
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddList from "../../ModalContents/AddList";
import Modal from "@/src/components/Modal";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { addList, AddListPayload } from "@/src/services/list";
import { useSession } from "next-auth/react";

const AddListButton = () => {
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();
  const userId = session?.user.id;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutateAsync: createList } = useMutation({
    mutationFn: (body: AddListPayload) => addList(body),
    onSuccess: () => {
      handleModal();
      alert('리스트가 생성되었습니다.');
      queryClient.invalidateQueries(['getLists'] as InvalidateQueryFilters);
    }
  });

  const onSubmit = async (payload: any) => {
    const body = {
      ...payload,
      userId,
    }
    await createList(body);
  };

  const onClickButton = () => {
    handleModal();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='flex items-center gap-2 cursor-pointer' onClick={onClickButton}>
        <FontAwesomeIcon icon={faPlus} fontSize={14} />
        <span>목록 추가</span>
      </div>
      <Modal isOpen={isModalOpen} close={handleModal} submit={onSubmit}>
        <AddList />
      </Modal>
    </>
  )
}

export default AddListButton;