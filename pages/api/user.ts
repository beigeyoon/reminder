import prisma from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from 'next';

type UserSelect = {
  id?: boolean;
  name?: boolean;
  password?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userInfo = await prisma.user.findUnique({
        where: {
          name: req.query.name as string,
        },
        select: {
          id: true,
          name: true,
          password: true,
        } as UserSelect
      });
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }

  if (req.method === 'POST') {
    try {
      const newUser = await prisma.user.create({
        data: req.body,
      });
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }
}