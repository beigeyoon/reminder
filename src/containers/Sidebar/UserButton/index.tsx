'use client'
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { signOut } from "next-auth/react";
import ContextMenu, { ContextMenuItem } from '@/src/components/ContextMenu';
import { deleteUser, DeleteUserPayload } from '@/src/services/user';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Modal } from 'antd';

const UserButton = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const isGithubUser = session?.user.provider === 'github';
  
  const { confirm } = Modal;

  const { mutateAsync: removeUser } = useMutation({
    mutationFn: (body: DeleteUserPayload) => deleteUser(body),
  });

  const menuItems: ContextMenuItem[] = [
    {
      id: 'sign-out',
      caption: '로그아웃',
      type: 'normal',
      onClick: () => signOut({ callbackUrl: '/'}),
    },
    {
      id: 'user-withdrawal',
      caption: '회원 탈퇴',
      type: 'normal',
      onClick: async () => showWithdrawalConfirm(),
    },
  ];

  const showWithdrawalConfirm = () => {
    confirm({
      title: '정말로 탈퇴하시겠습니까?',
      content: '회원 탈퇴 시 모든 데이터가 삭제됩니다.',
      onOk() {
        removeUser({ id: userId as string });
        signOut({ callbackUrl: '/'});
      },
      centered: true, 
    })
  }

  return (
    <div className='w-full float-end flex items-center justify-between'>
      <ContextMenu id='user-action-menus' items={menuItems} width={160} byLeftMouseButton={true}>
        <FontAwesomeIcon icon={faUser} fontSize={20} />
      </ContextMenu>
      <div className='flex gap-[4px] items-center text-gray300'>
        {session?.user.name}
        {!isGithubUser && (
          <FontAwesomeIcon icon={faGithub as IconProp} />
        )}
      </div>
    </div>
  )
}

export default UserButton;