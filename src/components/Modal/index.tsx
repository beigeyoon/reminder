import React, { Children, ReactNode, cloneElement, isValidElement } from "react";
import ReactDOM from "react-dom";
import { useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  submit: (payload?: any) => void;
};

export default function Modal ({ isOpen, close, children, submit }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      close();
    }
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) return cloneElement(child, { close, submit, ...child.props });
    return child;
  });

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className='dim fixed left-0 top-0 w-screen h-screen bg-black/20 z-30 flex justify-center items-center overflow-y-auto'
      onClick={handleCloseModal}
    >
      <div className='rounded-xl border border-gray300 bg-white p-[16px] w-fit h-fit drop-shadow-xl'>
        {childrenWithProps}
      </div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement
  );
};