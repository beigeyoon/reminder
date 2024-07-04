import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  try {
    const lists = await prisma.list.findMany({
      where: {
        userId: userId as string,
      },
      include: {
        items: true,
      }
    });
    return Response.json(lists);
  } catch (error) {
    return Response.json(error);
  }
};

export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newList = await prisma.list.create({
      data,
    });
    return Response.json(newList);
  } catch (error) {
    return Response.json(error);
  }
};

export async function PUT (req: NextRequest) {
  const { id, data } = await req.json();
  try {
    const updatedList = await prisma.list.update({
      where: {
        id: id
      },
      data: data,
    });
    return Response.json(updatedList);
  } catch (error) {
    return Response.json(error);
  }
};

export async function DELETE (req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedList = await prisma.list.delete({
      where: {
        id: id
      }
    });
    return Response.json(deletedList);
  } catch (error) {
    return Response.json(error);
  }
};