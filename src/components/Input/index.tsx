import React, { forwardRef, ReactNode, InputHTMLAttributes, Ref } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

const Input = forwardRef((props: IInput, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className='px-[4px] py-[3px] rounded-md border border-gray200 w-full'
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;