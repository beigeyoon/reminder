import prisma from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const lists = await prisma.list.findMany();
      return res.status(200).json(lists);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }

  if (req.method === 'POST') {
    try {
      const newList = await prisma.list.create({
        data: JSON.parse(req.body).data,
      });
      return res.status(200).json(newList);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }
}