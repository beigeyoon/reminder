import { ReactNode, ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({ children, disabled = false, ...props }: IButton) => {
  const buttonStyle = {
    available: 'border-gray200',
    disable: 'border-gray100 text-gray200',
  }
  return (
    <button
      className={`px-[10px] py-[3px] rounded-md border shadow ${disabled ? buttonStyle.disable : buttonStyle.available}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;