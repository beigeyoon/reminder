import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const listId = searchParams.get('listId');
  try {
    const items = await prisma.item.findMany({
      where: {
        listId: listId as string,
      },
      include: {
        subItems: true,
      }
    });
    return Response.json(items);
  } catch (error) {
    return Response.json(error);
  }
};

export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newItem = await prisma.item.create({
      data,
    });
    return Response.json(newItem);
  } catch (error) {
    return Response.json(error);
  }
};

export async function PUT (req: NextRequest) {
  const { id, data } = await req.json();
  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: id
      },
      data: data,
    });
    return Response.json(updatedItem);
  } catch (error) {
    return Response.json(error);
  }
};

export async function DELETE (req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedItem = await prisma.item.delete({
      where: {
        id: id
      }
    });
    return Response.json(deletedItem);
  } catch (error) {
    return Response.json(error);
  }
};