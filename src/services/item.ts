import { Priority } from './../enums/index';
import { Section, Item, SubItem, Tag } from "../types";

export interface GetItemsPayload {
  listId: string;
}

export interface AddItemPayload {
  listId: string;
  title: string;
  checked?: boolean;
  flagged?: boolean;
  memo?: string;
  url?: string;
  dateTime?: any;
  tags?: Tag[];
  subItems?: SubItem[];
  priority?: Priority;
  section?: Section;
  sectionId?: string;
  image_url?: string;
}

export const getItems = async ({ listId }: GetItemsPayload): Promise<Item[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/items?listId=${listId}`, {
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