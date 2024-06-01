'use client'
import { Drawer as AntdDrawer } from "antd";
import Calendar from "@/src/containers/Calendar";

interface IDrawer {
  isOpen: boolean;
  close: () => void;
  onClickItemCheckbox: (itemId: string, isChecked: boolean) => void;
}

const Drawer = ({ isOpen, close, onClickItemCheckbox }: IDrawer) => {
  return (
    <AntdDrawer
      placement="right"
      width={1200}
      open={isOpen}
      onClose={close}
    >
      <Calendar onClickItemCheckbox={onClickItemCheckbox} />
    </AntdDrawer>
  )
}

export default Drawer;