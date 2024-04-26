import prisma from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const lists = await prisma.list.findMany({
        where: {
          userId: req.query.userId as string,
        },
        include: {
          items: true,
        }
      });
      return res.status(200).json(lists);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }

  if (req.method === 'POST') {
    try {
      const newList = await prisma.list.create({
        data: req.body
      });
      return res.status(200).json(newList);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }

  if (req.method === 'PUT') {
    try {
      const updatedList = await prisma.list.update({
        where: {
          id: req.body.id,
        },
        data: req.body.data,
      });
      return res.status(200).json(updatedList);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedList = await prisma.list.delete({
        where: {
          id: JSON.parse(req.body).id,
        }
      });
      return res.status(200).json(deletedList);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}