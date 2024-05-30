'use client'
import { Drawer as AntdDrawer } from "antd";
import Calendar from "@/src/containers/Calendar";

interface IDrawer {
  isOpen: boolean;
  close: () => void;
}

const Drawer = ({ isOpen, close }: IDrawer) => {

  return (
    <AntdDrawer
      placement="right"
      width={1000}
      open={isOpen}
      onClose={close}
    >
      <Calendar />
    </AntdDrawer>
  )
}

export default Drawer;