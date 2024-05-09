import { SubItem } from "../types";

export interface AddSubItemPayload {
  itemId: string;
  title: string;
  checked?: boolean;
}

export interface UpdateSubItemPayload {
  id: string;
  title?: string;
  checked?: boolean;
}

export interface DeleteSubItemPayload {
  id: string;
}

export const addSubItem = async (body: AddSubItemPayload): Promise<SubItem> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to add subItem: ${response.statusText}`);
  }
  return await response.json();
}

export const updateSubItem = async (body: UpdateSubItemPayload): Promise<SubItem> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to update subItem: ${response.statusText}`);
  }
  return await response.json();
}

export const deleteSubItem = async (body: DeleteSubItemPayload): Promise<SubItem> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Failed to delete subItem: ${response.statusText}`);
  }
  return await response.json();
}