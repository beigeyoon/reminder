import { PropsWithChildren, useState } from "react";
import { SecondDepthMenuItem } from ".";

interface ISecondDepthMenu {
  items: SecondDepthMenuItem[];
  width?: number;
}

const SecondDepthMenu = ({ items, width, children }: PropsWithChildren<ISecondDepthMenu>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const handleMouseEnter = () => {
    setIsVisible(true);
  }

  const handleMouseLeave = () => {
    setIsVisible(false);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>{children}</div>
      {isVisible && (
        <ul className="absolute border border-gray200 rounded-lg drop-shadow-md p-[4px] z-20 bg-gray100">
          <li>hello</li>
        </ul>
      )}
    </div>
  )
}

export default SecondDepthMenu;