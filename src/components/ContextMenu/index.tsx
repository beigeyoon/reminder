import { PropsWithChildren, useState, useEffect, useRef, useCallback } from "react";
import SecondDepthMenu from "./SecondDepthMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  byLeftMouseButton?: boolean;
}

const ContextMenu = ({ id, items, width = 160, byLeftMouseButton = false, children }: PropsWithChildren<IContextMenu>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ulRef = useRef<HTMLUListElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      // 컨텍스트 메뉴 오픈시, 이미 오픈된 다른 메뉴를 close 하기 위해 이벤트 dispatch
      document.dispatchEvent(
        new CustomEvent<string>('contextMenuOpened', {
          detail: id,
        })
      );
    }
}, [isVisible, id]);

  return (
    <>
      <div
        onContextMenu={byLeftMouseButton ? undefined : handleContextMenu}
        onClick={byLeftMouseButton ? handleContextMenu : undefined}
      >
        {children}
      </div>
      {isVisible && (
        <ul
          style={{ left: position.x, top: position.y, width }}
          ref={ulRef}
          className='absolute border border-gray200 rounded-lg drop-shadow-md p-[4px] z-10 bg-gray100'
        >
          {items.map((item: ContextMenuItem) => <MenuItem key={item.id} item={item} closeMenu={() => setIsVisible(false)} width={width} />
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
  width: number;
}

const MenuItem = ({ item, closeMenu, width }: IMenuItem) => {
  const { type, caption, onClick, secondDepthItems } = item;

  if (type === 'divider') {
    return <hr className='mx-[8px] my-[4px] border-gray200' />;
  } else if (type === 'hasSecondDepth' && secondDepthItems) {
    return (
      <SecondDepthMenu items={secondDepthItems} parentWidth={width}>
        <li
          className='px-[8px] py-[4px] rounded-md cursor-pointer hover:bg-blue hover:text-white'
          onClick={() => {
            closeMenu();
            if (onClick) onClick();
          }}
        >
          <div className='flex justify-between items-center'>
            {caption}
            <span className='text-[10px]'>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
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