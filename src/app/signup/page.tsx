'use client'
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { addUser } from "@/src/services/user";
import { hashPassword } from "@/src/utils/bcrypt";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { status, data: session } = useSession();

  if (session) {
    router.push('/dashboard');
  };

  const { username, password } = inputs;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickSignUp = async () => {
    const response = await addUser(inputs);
    if (response.ok) {
      alert('User Added Successfully!');
      router.push('/login');
    } else {
      alert(response.error);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSignUp();
    }
  };

  if (status === 'loading') return <></>;
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[320px] flex flex-col gap-4 text-sm'>
        <div className='text-center text-[18px] font-bold pb-4'>
          Sign Up
        </div>
        <div className='flex justify-between items-start'>
          <label className='pt-[5px]'>Username *</label>
          <div className='flex flex-col w-[240px] gap-[4px]'>
            <input
              type='text'
              name='username'
              value={username}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              className='border border-gray400 rounded p-1'
            />
            <span className='text-[10px] font-bold'>
              Must be at least 4 english characters.
            </span>
          </div>
        </div>
        <div className='flex justify-between items-start'>
          <label className='pt-[5px]'>Password *</label>
          <div className='flex flex-col w-[240px] gap-[4px]'>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChangeInput}
              onKeyDown={onKeyDown}
              className='border border-gray400 rounded p-1'
            />
            <span className='text-[10px] font-bold'>
              Must be at least 8 english/number characters.
            </span>
          </div>
        </div>
        <button
          onClick={onClickSignUp}
          className='border border-GREEN rounded py-2 mt-4 text-GREEN font-bold'
        >
          Join
        </button>
        <button
          onClick={() => router.push('/login')}
          className='text-gray400 underline'
        >
          Back To Login
        </button>
      </div>
    </div>
  )
}

export default SignUp;