import { List, Item } from "../common/types";
import { Color, Icon, OrderBy } from "../common/enums";

export interface GetListsPayload {
  userId: string;
}

export interface AddListPayload {
  name: string;
  icon: Icon;
  color: Color;
  items?: Item[];
}

export interface UpdateListPayload {
  id: string;
  name?: string;
  orderBy?: OrderBy;
  icon?: Icon;
  color?: Color;
}

export interface DeleteListPayload {
  id: string;
}

export const getLists = async ({ userId }: GetListsPayload): Promise<List[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/lists?userId=${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(`Failed to get lists: ${response.statusText}`);
  }
  return await response.json();
}

export const addList = async (body: AddListPayload): Promise<List> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/lists`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/lists`, {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/lists`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete list: ${response.statusText}`);
  }
  return await response.json();
}