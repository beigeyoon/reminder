'use client'
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === 'loading') return <></>;
  if (session) {
    router.push('/');
  };

  const { username, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickLogin = async () => {
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

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
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
          onClick={() => router.push('/signup')}
          className='text-gray400 underline'
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Login;