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
        tags: true,
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
  const { tags, ...dataWithoutTags } = data;
  
  try {
    const newItem = await prisma.item.create({
      data: dataWithoutTags,
    });
    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({
        where: {
          name: tagName
        }
      });
      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName
          }
        });
      }
      await prisma.item.update({
        where: { id: newItem.id },
        data: {
          tags: {
            connect: { id: tag.id }
          }
        }
      })
    }
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