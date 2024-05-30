import CircleIcon from "@/src/components/CircleIcon";
import { List } from "@/src/types";
import { deleteList, updateList } from "@/src/services/list";
import ContextMenu, { ContextMenuItem } from "@/src/components/ContextMenu";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { DeleteListPayload, UpdateListPayload } from "@/src/services/list";
import { useListInfo } from '@/src/store/useListInfo';
import { useState } from "react";
import AddList from "@/src/containers/ModalContents/AddList";
import Modal from "@/src/components/Modal";
import { Modal as AntdModdal } from "antd";

interface IListButton {
  list: List;
}

const ListButton = ({ list }: IListButton) => {
  const { id, color, icon, name, items } = list;
  const queryClient = useQueryClient();
  const { setListInfo } = useListInfo();
  const { confirm } = AntdModdal;

  const [isEditListModalOpen, setIsEditListModalOpen] = useState<boolean>(false);

  const selectList = () => {
    setListInfo(list);
  };

  const { mutateAsync: editList } = useMutation({
    mutationFn: (body: UpdateListPayload) => updateList(body),
    onSuccess: () => {
      alert('리스트가 수정되었습니다.');
      queryClient.invalidateQueries(['getLists'] as InvalidateQueryFilters);
      setIsEditListModalOpen(false);
    }
  });

  const { mutateAsync: removeList } = useMutation({
    mutationFn: (body: DeleteListPayload) => deleteList(body),
    onSuccess: () => {
      alert('리스트가 삭제되었습니다.');
      queryClient.invalidateQueries(['getLists'] as InvalidateQueryFilters);
    }
  });

  const showDeleteConfirm = () => {
    confirm({
      title: '정말로 삭제하시겠습니까?',
      content: '목록 관련 데이터가 모두 삭제됩니다.',
      onOk() {
        removeList({ id });
      }
    })
  }

  const onSubmitEditList = async (payload: any) => {
    const body = {
      id,
      data: { ...payload },
    }
    await editList(body);
  }

  const menuItems: ContextMenuItem[] = [
    {
      id: 'unpin-list',
      caption: '목록 고정 해제',
      type: 'normal',
    },
    {
      id: 'divide-bar-1',
      type: 'divider',
    },
    {
      id: 'show-list-info',
      caption: '목록 정보 보기',
      type: 'normal',
      onClick: () => setIsEditListModalOpen(true),
    },
    {
      id: 'divide-bar-2',
      type: 'divider',
    },
    {
      id: 'sort-items',
      caption: '다음으로 정렬',
      type: 'hasSecondDepth',
      secondDepthItems: [
        {
          id: 'sort-items-manually',
          caption: '수동',
        }
      ]
    },
    {
      id: 'divide-bar-3',
      type: 'divider',
    },
    {
      id: 'delete-list',
      caption: '삭제',
      type: 'normal',
      onClick: () => showDeleteConfirm(),
    },
    {
      id: 'set-group',
      caption: '그룹에 추가',
      type: 'normal',
    },
  ];

  return (
    <>
      <ContextMenu
        id={`list-button-${id}`}
        items={menuItems}
        width={160}
      >
        <button
          className='w-[123px] flex flex-col justify-between bg-gray200 rounded-xl p-[10px]'
          onClick={selectList}
        >
          <div className="w-full flex items-center justify-between">
            <CircleIcon iconName={icon} colorName={color} size='large' />
            <span className='font-bold text-lg'>{items?.length}</span>
          </div>
          <span className='font-bold mt-[8px] overflow-hidden whitespace-nowrap text-ellipsis w-full text-left'>{name}</span>
        </button>   
      </ContextMenu>
      <Modal isOpen={isEditListModalOpen} close={() => setIsEditListModalOpen(false)} submit={onSubmitEditList}>
        <AddList mode='edit' listInfo={list} />
      </Modal>
    </>
  )
}

export default ListButton;