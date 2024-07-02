'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useLoading } from "@/src/store/useLoading";

const Login = () => {
  const { setIsLoading } = useLoading();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    };
  }, [session, router])

  const { username, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickLogin = async () => {
    setIsLoading(true);

    const response = await signIn("username-password-credential", {
      name: username,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    
    if (response?.error) {
      alert(response.error);
    }
  };

  const onClickGithubLogin = () => {
    setIsLoading(true);
    signIn('github')
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <motion.div
      className='w-screen h-screen flex justify-center items-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='w-[300px] flex flex-col gap-4 text-sm'>
        <div className='text-center text-[24px] font-bold pb-4'>
          Reminder ☑️
        </div>
        <div className='flex justify-between items-center'>
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            className='border border-gray400 rounded p-1 w-[220px]'
          />
        </div>
        <div className='flex justify-between items-center'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            className='border border-gray400 rounded p-1 w-[220px]'
          />
        </div>
        <button
          onClick={onClickLogin}
          className='border border-GREEN rounded py-2 mt-4 text-GREEN font-bold'
        >
          Login
        </button>
        <button
          onClick={onClickGithubLogin}
          className='rounded bg-black py-2 text-white font-bold'
        >
          <FontAwesomeIcon icon={faGithub as IconProp} className='mr-[8px]' />
          Github Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className='text-gray400 underline'
        >
          Sign Up
        </button>
      </div>
    </motion.div>
  )
}

export default Login;