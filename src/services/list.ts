import { Color, Icon, ListType } from "../enums";
import { List, Item, Section } from "../types";

export interface GetListsPayload {
  userId: string;
}

export interface AddListPayload {
  name: string;
  type: ListType;
  icon: Icon;
  color: Color;
  items?: Item[];
  sections?: Section[];
}

export interface UpdateListPayload {
  id: string;
  name?: string;
  type?: ListType;
  icon?: Icon;
  color?: Color;
}

export interface DeleteListPayload {
  id: string;
}

export const getLists = async ({ userId }: GetListsPayload): Promise<List[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list?userId=${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to get lists: ${response.statusText}`);
  }
  return await response.json();
}

export const addList = async (body: AddListPayload): Promise<List> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to add list: ${response.statusText}`);
  }
  return await response.json();
}

export const updateList = async (body: UpdateListPayload): Promise<List> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to update list: ${response.statusText}`);
  }
  return await response.json();
}

export const deleteList = async (body: DeleteListPayload): Promise<List> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete list: ${response.statusText}`);
  }
  return await response.json();
}