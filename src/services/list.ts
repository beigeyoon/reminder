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

export const getLists = async ({ userId }: GetListsPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list?userId=${userId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export const addList = async (body: AddListPayload): Promise<List> => {
  try {
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

    const data = await response.json();
    return data as List; // 형변환을 통해 반환 타입 명시
  } catch (error) {
    console.error('Error adding list:', error);
    throw error;
  }
}