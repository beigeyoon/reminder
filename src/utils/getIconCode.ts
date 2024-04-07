import { Icon } from "../enums"

export const getIconCode = (iconName: string) => {
  return Icon[iconName as keyof typeof Icon];
};