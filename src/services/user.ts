export interface GetUserInfoPayload {
  name: string;
}

export interface AddUserPayload {
  name: string;
  password: string;
}

export const getUserInfo = async ({ name }: GetUserInfoPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user?name=${name}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}