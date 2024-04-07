import { ReactNode, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const Input = ({ children, ...props }: IInput) => {
  return (
    <input
      className='px-[4px] py-[3px] rounded-md border border-gray200 w-full'
      {...props}
    >
      {children}
    </input>
  )
}

export default Input;