'use client'
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddList from "../../ModalContents/AddList";
import Modal from "@/src/components/Modal";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { addList, AddListPayload } from "@/src/services/list";
import { useSession } from "next-auth/react";
import { useListInfo } from "@/src/store/useListInfo";

const AddListButton = () => {
  const { setSelectedList } = useListInfo();
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();
  const userId = session?.user.id;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutateAsync: createList } = useMutation({
    mutationFn: (body: AddListPayload) => addList(body),
    onSuccess: (res) => {
      setSelectedList(res);
      handleModal();
      alert('리스트가 생성되었습니다.');
      queryClient.invalidateQueries(['getLists'] as InvalidateQueryFilters);
    }
  });

  const onSubmit = async (payload: any) => {
    if (payload.name.length === 0) {
      alert('리스트 이름을 입력하세요.');
      return;
    };
    const body = {
      ...payload,
      userId,
    };
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