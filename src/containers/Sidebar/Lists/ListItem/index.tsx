import { List } from "@/src/common/types";
import { deleteList, updateList } from "@/src/services/list";
import ContextMenu, { ContextMenuItem } from "@/src/components/ContextMenu";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { DeleteListPayload, UpdateListPayload } from "@/src/services/list";
import { useListInfo } from '@/src/store/useListInfo';
import { useState } from "react";
import AddList from "@/src/containers/ModalContents/AddList";
import Modal from "@/src/components/Modal";
import { Modal as AntdModdal } from "antd";
import ListButton from "./ListButton";

interface IListItem {
  list: List;
}

const ListItem = ({ list }: IListItem) => {
  const { id, color, icon, name, items } = list;
  const queryClient = useQueryClient();
  const { setSelectedList } = useListInfo();
  const { confirm } = AntdModdal;

  const [isEditListModalOpen, setIsEditListModalOpen] = useState<boolean>(false);

  const selectList = () => {
    setSelectedList(list);
  };

  const { mutateAsync: editList } = useMutation({
    mutationFn: (body: UpdateListPayload) => updateList(body),
    onSuccess: (_, vars) => {
      const isChangeOrderBy = vars.data.hasOwnProperty('orderBy');
      if (!isChangeOrderBy) alert('리스트가 수정되었습니다.');
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
      id: 'show-list-info',
      caption: '목록 정보 보기',
      type: 'normal',
      onClick: () => setIsEditListModalOpen(true),
    },
    {
      id: 'divide-bar-1',
      type: 'divider',
    },
    {
      id: 'sort-items',
      caption: '다음으로 정렬',
      type: 'hasSecondDepth',
      secondDepthItems: [
        {
          id: 'sort-items-newest',
          caption: '최신 순으로 정렬',
          onClick: () =>onSubmitEditList({ orderBy: 'NEWEST' }),
        },
        {
          id: 'sort-items-by-oldest',
          caption: '오래된 순으로 정렬',
          onClick: () =>onSubmitEditList({ orderBy: 'OLDEST' }),
        },
        {
          id: 'sort-items-by-priority',
          caption: '우선순위로 정렬',
          onClick: () =>onSubmitEditList({ orderBy: 'PRIORITY' }),
        }
      ]
    },
    {
      id: 'divide-bar-2',
      type: 'divider',
    },
    {
      id: 'delete-list',
      caption: '삭제',
      type: 'normal',
      onClick: () => showDeleteConfirm(),
    },
  ];

  return (
    <>
      <ContextMenu
        id={`list-button-${id}`}
        items={menuItems}
        width={160}
      >
        <ListButton
          name={name}
          icon={icon}
          color={color}
          items={items}
          selectList={selectList}
        />  
      </ContextMenu>
      <Modal isOpen={isEditListModalOpen} close={() => setIsEditListModalOpen(false)} submit={onSubmitEditList}>
        <AddList mode='edit' listInfo={list} />
      </Modal>
    </>
  )
}

export default ListItem;