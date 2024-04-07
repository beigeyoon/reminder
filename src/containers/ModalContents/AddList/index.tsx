import { useState } from "react";
import ColorSelect from "./ColorSelect";
import { Color, Icon, ListType } from "@/src/enums";
import IconSelect from "./IconSelect";
import Input from "@/src/components/Input";

const AddList = () => {
  const [color, setColor] = useState<keyof typeof Color>('BLUE');
  const [icon, setIcon] = useState<keyof typeof Icon>('LIST')

  const selectColor = (colorName: keyof typeof Color) => {
    setColor(colorName);
  };

  const selectIcon = (iconName: keyof typeof Icon) => {
    setIcon(iconName);
  };

  return (
    <form>
      <div className='flex mb-[8px] items-center'>
        <label className='leading-[18px] whitespace-nowrap pr-[8px]'>이름: </label>
        <Input />
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
      <div>
        <label className='leading-[18px] whitespace-nowrap pr-[8px]'>목록 유형: </label>
        <select className='border border-gray100'>
          {Object.keys(ListType).map((item) => (
            <option key={item} value={item}>{ListType[item as keyof typeof ListType]}</option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default AddList;