import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const itemId = searchParams.get('itemId');
  try {
    const subItems = await prisma.subItem.findMany({
      where: {
        itemId: itemId as string,
      },
    });
    return Response.json(subItems);
  } catch (error) {
    return Response.json(error);
  }
};

export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newSubItem = await prisma.subItem.create({
      data,
    });
    await prisma.item.update({
      where: { id: data.itemId },
      data: {
        subItems: {
          connect: { id: newSubItem.id }
        }
      }
    });
    return Response.json(newSubItem);
  } catch (error) {
    return Response.json(error);
  }
};

export async function PUT (req: NextRequest) {
  const { id, data } = await req.json();
  try {
    const updatedSubItem = await prisma.subItem.update({
      where: {
        id: id
      },
      data: data,
    });
    return Response.json(updatedSubItem);
  } catch (error) {
    return Response.json(error);
  }
};

export async function DELETE (req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedSubItem = await prisma.subItem.delete({
      where: {
        id: id
      }
    });
    return Response.json(deletedSubItem);
  } catch (error) {
    return Response.json(error);
  }
};