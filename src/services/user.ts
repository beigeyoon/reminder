import { hashPassword } from "../utils/bcrypt";

export interface GetUserInfoPayload {
  name: string;
}

export interface AddUserPayload {
  username: string;
  password?: string;
  id?: string;
}

export interface DeleteUserPayload {
  id: string;
}

export const getUserInfo = async ({ name }: GetUserInfoPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/users?name=${name}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export const addUser = async ({ username, password, id }: AddUserPayload) => {
  const payload = password ? {
    name: username, password: await hashPassword(password)
  } : { name: username, id: id?.toString() };
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return data;
}

export const deleteUser = async (body: DeleteUserPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/users`, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
  return await response.json();
}