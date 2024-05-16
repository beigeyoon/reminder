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

export const addSubItem = async (body: AddSubItemPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const updateSubItem = async (body: UpdateSubItemPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export const deleteSubItem = async (body: DeleteSubItemPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/subitems`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}