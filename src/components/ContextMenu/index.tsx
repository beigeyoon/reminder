import { PropsWithChildren, useState, useEffect, KeyboardEvent, useRef, useCallback } from "react";

type ContextMenuItem = {
  id: string;
  caption?: string;
  onClick?: () => void;
  isDivideBar?: boolean;
}

interface IContextMenu {
  id: string;
  items: ContextMenuItem[];
  width?: number;
}

const ContextMenu = ({ id, items, width, children }: PropsWithChildren<IContextMenu>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ulRef = useRef<HTMLUListElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  }

  const keyDownHandler = useCallback((e: WindowEventMap['keydown']) => {
    if (e.code === 'Escape') setIsVisible(false);
  }, [])

  const clickHandler = useCallback((e: MouseEvent) => {
    if (isVisible) {
      const rect = ulRef.current?.getBoundingClientRect();
      if (rect) {
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY > rect.top || e.clientY < rect.bottom) {
          setIsVisible(false);
        }
      }
    }
  }, [isVisible])

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('click', clickHandler);
    }
  }, [keyDownHandler, clickHandler]);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isVisible && (
        <ul
          style={{ left: position.x, top: position.y, width }}
          ref={ulRef}
          className='absolute border border-gray200 rounded-lg drop-shadow-md p-[4px] z-10 bg-gray100'
        >
          {items.map((item: ContextMenuItem) => item.isDivideBar ? (
            <hr
              key={item.id}
              className='mx-[8px] my-[4px] border-gray200'
            />
          ) : (
            <li
              key={item.id}
              className='px-[8px] py-[4px] rounded-md cursor-pointer hover:bg-blue hover:text-white'
              onClick={() => {
                setIsVisible(false);
                if (item.onClick) item.onClick();
              }}
            >
              {item.caption}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ContextMenu;