import { PropsWithChildren, useState, useEffect, useRef, useCallback } from "react";
import SecondDepthMenu from "./SecondDepthMenu";

export interface ContextMenuItem {
  id: string;
  type: 'normal' | 'hasSecondDepth' | 'divider';
  caption?: string;
  onClick?: () => void;
  secondDepthItems?: SecondDepthMenuItem[];
}

export type SecondDepthMenuItem = {
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

  const contextMenuOpenedHandler = useCallback((e: Event) => {
    if ((e as CustomEvent<string>).detail != id) {
      setIsVisible(false);
    }
  }, [id]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('click', clickHandler);
    document.addEventListener('contextMenuOpened', contextMenuOpenedHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('click', clickHandler);
      document.removeEventListener('contextMenuOpened', contextMenuOpenedHandler);
    }
  }, [keyDownHandler, clickHandler, contextMenuOpenedHandler]);

  useEffect(() => {
    if (isVisible) {
      document.dispatchEvent(
        new CustomEvent<string>('contextMenuOpened', {
          detail: id,
        })
      );
    }
}, [isVisible, id]);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isVisible && (
        <ul
          style={{ left: position.x, top: position.y, width }}
          ref={ulRef}
          className='absolute border border-gray200 rounded-lg drop-shadow-md p-[4px] z-10 bg-gray100'
        >
          {items.map((item: ContextMenuItem) => <MenuItem key={item.id} item={item} closeMenu={() => setIsVisible(false)} />
          )}
        </ul>
      )}
    </>
  )
}

export default ContextMenu;


interface IMenuItem {
  item: ContextMenuItem;
  closeMenu: () => void;
}

const MenuItem = ({ item, closeMenu }: IMenuItem) => {
  const { type, caption, onClick, secondDepthItems } = item;

  if (type === 'divider') {
    return <hr className='mx-[8px] my-[4px] border-gray200' />;
  } else if (type === 'hasSecondDepth' && secondDepthItems) {
    return (
      <SecondDepthMenu items={secondDepthItems}>
        <li
        className='px-[8px] py-[4px] rounded-md cursor-pointer hover:bg-blue hover:text-white'
        onClick={() => {
          closeMenu();
          if (onClick) onClick();
        }}
        >
          {caption + '>>>>'}
        </li>
      </SecondDepthMenu>
    )
  } else return (
    <li
      className='px-[8px] py-[4px] rounded-md cursor-pointer hover:bg-blue hover:text-white'
      onClick={() => {
        closeMenu();
        if (onClick) onClick();
      }}
    >
      {caption}
    </li>
  )
}