const bcrypt = require('bcryptjs');

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}