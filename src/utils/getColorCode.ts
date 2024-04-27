import { Color } from "../enums"

export const getColorCode = (colorName: string) => {
  return Color[colorName as keyof typeof Color];
};