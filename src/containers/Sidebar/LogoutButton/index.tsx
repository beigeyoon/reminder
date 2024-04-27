'use client'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button className='text-end' onClick={() => signOut({
      callbackUrl: '/'
    })}>
      <FontAwesomeIcon icon={faRightFromBracket} fontSize={20} />
    </button>
  )
}

export default LogoutButton;