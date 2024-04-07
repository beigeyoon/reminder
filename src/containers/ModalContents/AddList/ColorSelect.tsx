import { Color } from "@/src/enums"
import { getColorCode } from "@/src/utils/getColorCode";

interface IColorSelect {
  selectedColor: keyof typeof Color;
  onSelect: (colorName: keyof typeof Color) => void;
}

const ColorSelect = ({ selectedColor, onSelect }: IColorSelect) => {
  const colors = Object.keys(Color);

  return (
    <div className='w-[192px]'>
      {colors.map((color) => {
        const isSelectedColor = color === selectedColor;
        return (
          <div
            key={color}
            style={{ backgroundColor: getColorCode(color) }}
            className='inline-block w-[24px] h-[24px] rounded-full border border-gray100 mr-[8px] mb-[10px] relative'
            onClick={() => onSelect(color as keyof typeof Color)}
            >
            {isSelectedColor && (
              <div className='absolute top-[6px] left-[6px] w-[10px] h-[10px] rounded-full bg-white' />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ColorSelect;