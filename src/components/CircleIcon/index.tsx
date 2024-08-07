import { Color, Icon } from "@/src/common/enums";
import { getColorCode } from "@/src/utils/getColorCode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faBookOpen, faFile, faMoneyBill, faDesktop, faPerson, faCartShopping, faPlane, faBucket, faLightbulb, faHouse, faMusic, faSun, faMoon, faHeart, faStar, faCalendarDay, faClipboardList, faCheck, faTree, faPalette, faCircleQuestion, faCircleExclamation, faWrench } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ICircleIcon {
  iconName: keyof typeof Icon;
  colorName: keyof typeof Color;
  size?: 'small' | 'medium' | 'large';
}

const iconMap: Record<keyof typeof Icon, IconProp> = {
  LIST: faListUl,
  BOOK: faBookOpen,
  FILE: faFile,
  MONEY: faMoneyBill,
  COMPUTER: faDesktop,
  PERSON: faPerson,
  SHOPPING: faCartShopping,
  TRIP: faPlane,
  BUCKET: faBucket,
  IDEA: faLightbulb,
  HOUSE: faHouse,
  MUSIC: faMusic,
  SUN: faSun,
  MOON: faMoon,
  HEART: faHeart,
  STAR: faStar,
  TODAY: faCalendarDay,
  SCHEDULED: faClipboardList,
  CHECKED: faCheck,
  TREE: faTree,
  PALETTE: faPalette,
  QUESTION: faCircleQuestion,
  EXCLAMATION: faCircleExclamation,
  WRENCH: faWrench,
};

const CircleIcon = ({ iconName, colorName, size = 'medium' }: ICircleIcon) => {
  const styles = {
    circleWidth: {
      small: `w-[16px]`,
      medium: `w-[20px]`,
      large: `w-[24px]`,
    },
    circleHeight: {
      small: `h-[16px]`,
      medium: `h-[20px]`,
      large: `h-[24px]`,
    },
    iconSize: {
      small: 10,
      medium: 12,
      large: 14,
    }
  }
  return (
    <div
      style={{ backgroundColor: getColorCode(colorName) }}
      className={`flex justify-center items-center rounded-full text-white ${styles.circleWidth[size]} ${styles.circleHeight[size]} relative`}
    >
      <FontAwesomeIcon icon={iconMap[iconName]} fontSize={styles.iconSize[size]} />
    </div>
  )
}

export default CircleIcon;