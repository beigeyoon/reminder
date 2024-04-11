export interface GetUserInfoPayload {
  name: string;
}

export interface AddUserPayload {
  username: string;
  password: string;
}

export const getUserInfo = async ({ name }: GetUserInfoPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user?name=${name}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export const addUser = async ({ username, password }: AddUserPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user`, {
    method: 'POST',
    body: JSON.stringify({
      name: username,
      password,
    })
  });
  const data = await response.json();
  return data;
}