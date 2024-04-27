import { Icon, Color } from "@/src/enums";
import { getIconCode } from "@/src/utils/getIconCode";
import { getColorCode } from "@/src/utils/getColorCode";
import CircleIcon from "@/src/components/CircleIcon";

interface IIconSelect {
  selectedColor: keyof typeof Color;
  selectedIcon: keyof typeof Icon;
  onSelect: (iconName: keyof typeof Icon) => void;
}

const IconSelect = ({ selectedColor, selectedIcon, onSelect }: IIconSelect) => {
  const icons = Object.keys(Icon);

  return (
    <div className='w-[256px]'>
      {icons.map((icon) => {
        const isSelectedIcon = icon === selectedIcon;
        const selectedStyle: { [key: string]: string } = {
          true: 'ring-2 ring-offset-2',
          false: '',
        }
        return (
          <div
            key={icon}
            onClick={() => onSelect(icon as keyof typeof Icon)}
            className={`inline-block rounded-full mr-[8px] mb-[10px] ${selectedStyle[isSelectedIcon.toString()]}`}
          >
            <CircleIcon
              iconName={icon as keyof typeof Icon}
              colorName={selectedColor}
              size='large'
            />
          </div>
        )
      })}
    </div>
  )
}

export default IconSelect;