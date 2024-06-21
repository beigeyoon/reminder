import { Priority } from "../common/enums";
import { Section, Item, SubItem, Tag } from "../common/types";

export interface GetItemsPayload {
  listId?: string;
  year?: number;
  month?: number;
  tagId?: string;
  keyword?: string;
  userId?: string;
}

export interface AddItemPayload {
  listId: string;
  title: string;
  checked?: boolean;
  flagged?: boolean;
  memo?: string;
  url?: string;
  dateTime?: any;
  hasTime?: boolean;
  tags?: Tag[];
  subItems?: SubItem[];
  priority?: Priority;
  section?: Section;
  sectionId?: string;
  image_url?: string;
  userId?: string;
}

export interface UpdateItemPayload {
  id: string;
  title?: string;
  checked?: boolean;
  flagged?: boolean;
  memo?: string;
  url?: string;
  dateTime?: any;
  hasTime?: boolean;
  tags?: {
    addedTags: string[];
    deletedTags: string[];
  }
  subItems?: SubItem[];
  priority?: Priority;
  section?: Section;
  sectionId?: string;
  image_url?: string;
  userId?: string;
}

export interface DeleteItemPayload {
  id: string;
}

export const getItems = async ({ listId, year, month, tagId, keyword, userId }: GetItemsPayload): Promise<Item[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/items?listId=${listId || ''}&year=${year || ''}&month=${month || ''}&tagId=${tagId || ''}&keyword=${keyword || ''}&userId=${userId || ''}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to get items: ${response.statusText}`);
  }
  return await response.json();
}

export const addItem = async (body: AddItemPayload): Promise<Item> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to add item: ${response.statusText}`);
  }
  return await response.json();
}

export const updateItem = async (body: UpdateItemPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const deleteItem = async (body: DeleteItemPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}