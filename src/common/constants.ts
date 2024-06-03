import { ListType } from "./enums";
import { PresetList } from "./types";

export const presetLists: PresetList[] = [
  {
    id: 'today-list',
    name: '오늘',
    color: 'BLUE',
    icon: 'TODAY',
    type: ListType.STANDARD,
    isPreset: true,
    items: [],
  },
  {
    id: 'scheduled-list',
    name: '예정',
    color: 'RED',
    icon: 'SCHEDULED',
    type: ListType.STANDARD,
    isPreset: true,
    items: [],
  },
  {
    id: 'checked-list',
    name: '완료됨',
    color: 'GRAY',
    icon: 'CHECKED',
    type: ListType.STANDARD,
    isPreset: true,
    items: [],
  },
];

export const colorStyleMap = {
  RED: 'bg-RED',
  ORANGE: 'bg-ORANGE',
  YELLOW: 'bg-YELLOW',
  GREEN: 'bg-GREEN',
  LIGHTBLUE: 'bg-LIGHTBLUE',
  BLUE: 'bg-BLUE',
  DEEPBLUE: 'bg-DEEPBLUE',
  PINK: 'bg-PINK',
  PURPLE: 'bg-PURPLE',
  BROWN: 'bg-BROWN',
  GRAY: 'bg-GRAY',
  PINKBEIGE: 'bg-PINKBEIGE',
};