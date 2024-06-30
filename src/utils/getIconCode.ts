import { Icon } from "../common/enums";

export const getIconCode = (iconName: string) => {
  return Icon[iconName as keyof typeof Icon];
};