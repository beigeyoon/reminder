import { useState, useRef, useEffect } from "react";
import ColorSelect from "./ColorSelect";
import { Color, Icon } from "@/src/common/enums";
import IconSelect from "./IconSelect";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import { List } from "@/src/common/types";

interface IAddList {
  close?: () => void;
  submit?: (payload?: any) => void;
  mode?: 'add' | 'edit';
  listInfo?: List;
}

const AddList = ({ close, submit, mode = 'add', listInfo }: IAddList) => {
  const nameRef = useRef(null);
  const [color, setColor] = useState<keyof typeof Color>('BLUE');
  const [icon, setIcon] = useState<keyof typeof Icon>('LIST');

  useEffect(() => {
    if (mode === 'edit' && listInfo && nameRef.current) {
      nameRef.current.value = listInfo?.name;
      setColor(listInfo.color);
      setIcon(listInfo?.icon);
    }
  }, [listInfo, mode]);

  const selectColor = (colorName: keyof typeof Color) => {
    setColor(colorName);
  };

  const selectIcon = (iconName: keyof typeof Icon) => {
    setIcon(iconName);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const payload = {
      name: nameRef.current?.value,
      color,
      icon,
    }
    submit!(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex mb-[8px] items-center'>
        <label className='leading-[18px] whitespace-nowrap pr-[8px]'>이름: </label>
        <Input ref={nameRef} />
      </div>
      <div className='flex gap-[8px] py-[8px]'>
        <div className='flex'>
          <label className='leading-[24px] whitespace-nowrap pr-[8px]'>색상: </label>
          <ColorSelect selectedColor={color} onSelect={selectColor} />
        </div>
        <div className='flex'>
          <label className='leading-[24px] whitespace-nowrap pr-[8px]'>아이콘: </label>
          <IconSelect selectedColor={color} selectedIcon={icon} onSelect={selectIcon} />
        </div>
      </div>
      <div className='flex justify-end gap-[10px]'>
        <Button onClick={close}>취소</Button>
        <Button type='submit'>확인</Button>
      </div>
    </form>
  )
}

export default AddList;