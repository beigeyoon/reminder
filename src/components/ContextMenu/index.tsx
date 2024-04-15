import { PropsWithChildren, useState, useEffect, KeyboardEvent, useRef, useCallback } from "react";

type ContextMenuItem = {
  id: string;
  caption: string;
  onClick: () => void;
}

interface IContextMenu {
  id: string;
  items: ContextMenuItem[];
}

const ContextMenu = ({ id, items, children }: PropsWithChildren<IContextMenu>) => {
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
        <ul style={{ left: position.x, top: position.y }} className='absolute' ref={ulRef}>
          {items.map((item: ContextMenuItem) => (
            <li key={item.id} onClick={() => {
              setIsVisible(false);
              item.onClick();
            }}>
              {item.caption}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ContextMenu;