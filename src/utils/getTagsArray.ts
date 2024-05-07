import { Tag } from "../types";

export const getTagsArray = (tags: Tag[]) => {
  const result: string[] = [];
  tags.map((tag) => {
    result.push(tag.name);
  });
  return result;
};

export const updateTagLists = (prevTags: string[], newTags: string[]) => {
  const addedTags: string[] = [];
  const deletedTags: string[] = [];

  for (const tag of prevTags) {
    if (!newTags.includes(tag)) {
      deletedTags.push(tag);
    }
  }

  for (const tag of newTags) {
    if (!prevTags.includes(tag)) {
      addedTags.push(tag);
    }
  }

  return {
    addedTags,
    deletedTags,
  }
};