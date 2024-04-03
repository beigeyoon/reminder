export const getLists = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/list`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}