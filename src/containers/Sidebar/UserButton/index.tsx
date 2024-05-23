'use client'
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import ContextMenu, { ContextMenuItem } from '@/src/components/ContextMenu';
import { deleteUser, DeleteUserPayload } from '@/src/services/user';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const UserButton = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

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
      onClick: () => {
        console.log('💚💚💚💚💚', );
        signOut({ callbackUrl: '/'});
        removeUser({ id: userId });
      }
    },
  ];

  return (
    <div className='w-fit float-end'>
      <ContextMenu id='user-action-menus' items={menuItems} width={160} byLeftMouseButton={true}>
        <FontAwesomeIcon icon={faUser} fontSize={20}  />
      </ContextMenu>
    </div>
  )
}

export default UserButton;