import { PropsWithChildren, useState } from "react";
import { SecondDepthMenuItem } from ".";

interface ISecondDepthMenu {
  items: SecondDepthMenuItem[];
  parentWidth: number;
}

const SecondDepthMenu = ({ items, parentWidth, children }: PropsWithChildren<ISecondDepthMenu>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const handleMouseEnter = () => {
    setIsVisible(true);
  }

  const handleMouseLeave = () => {
    setIsVisible(false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='relative'>
      <div>{children}</div>
      {true && (
        <ul className='absolute w-fit top-[-4px] border border-gray200 rounded-lg drop-shadow-md p-[4px] z-20 bg-gray100' style={{ left: `${parentWidth - 5}px` }}>
          {items.map((item: SecondDepthMenuItem) => (
            <li className='px-[8px] py-[4px] rounded-md cursor-pointer hover:bg-blue hover:text-white break-words whitespace-nowrap'>
              {item.caption}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SecondDepthMenu;