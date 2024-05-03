import { Tag } from "../types";

export const getTagsArray = (tags: Tag[]) => {
  const result: string[] = [];
  tags.map((tag) => {
    result.push(tag.name);
  });
  return result;
};