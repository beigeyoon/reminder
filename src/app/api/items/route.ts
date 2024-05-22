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
  const { tags, subItems, ...dataWithoutTagsAndSubItems } = data;
  
  try {
    const newItem = await prisma.item.create({
      data: dataWithoutTagsAndSubItems,
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
  const { id, ...data } = await req.json();
  const { tags, subItems, ...dataWithoutTagsAndSubItems } = data;
  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: id
      },
      data: dataWithoutTagsAndSubItems,
    });
    if (tags.addedTags?.length > 0) {
      for (const tagName of tags.addedTags) {
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
          where: { id: updatedItem.id },
          data: {
            tags: {
              connect: { id: tag.id }
            }
          }
        })
      }
    }
    if (tags.deletedTags?.length > 0) {
      for (const tagName of tags.deletedTags) {
        await prisma.item.update({
          where: { id: updatedItem.id },
          data: {
            tags: {
              disconnect: { name: tagName }
            }
          }
        })
      }
    }
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
    return Response.json({ ok: true, item: deletedItem });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
};