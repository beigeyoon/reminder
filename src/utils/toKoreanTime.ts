import dayjs from "dayjs";

export const toKoreanTime = (date: any) => {
  return date ? dayjs(date).add(9, 'hour') : null; // UTC+9
};