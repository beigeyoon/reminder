import CircleIcon from "@/src/components/CircleIcon";
import { List } from "@/src/types";
import { deleteList } from "@/src/services/list";
import ContextMenu, { ContextMenuItem } from "@/src/components/ContextMenu";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { DeleteListPayload } from "@/src/services/list";

interface IListButton {
  list: List;
}

const ListButton = ({ list }: IListButton) => {
  const { id, color, icon, name, items } = list;
  const queryClient = useQueryClient();

  const { mutateAsync: removeList } = useMutation({
    mutationFn: (body: DeleteListPayload) => deleteList(body),
    onSuccess: () => {
      alert('리스트가 삭제되었습니다.');
      queryClient.invalidateQueries(['getLists'] as InvalidateQueryFilters);
    }
  })

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
      onClick: () => removeList({ id }),
    },
    {
      id: 'set-group',
      caption: '그룹에 추가',
      type: 'normal',
    },
  ];

  return (
    <ContextMenu
      id={`list-button-${id}`}
      items={menuItems}
      width={160}
    >
      <button
        className='w-[123px] flex flex-col justify-between bg-gray200 rounded-xl p-[10px]'
      >
        <div className="w-full flex items-center justify-between">
          <CircleIcon iconName={icon} colorName={color} size='large' />
          <span className='font-bold text-lg'>{items?.length}</span>
        </div>
        <span className='font-bold mt-[8px]'>{name}</span>
      </button>
    </ContextMenu>
    
  )
}

export default ListButton;