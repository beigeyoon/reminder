import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import dayjs from "dayjs";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const startDate = dayjs().year(year).month(parseInt(month) - 1).startOf('month').toDate();
  const endDate = dayjs(startDate).endOf('month').toDate();

  try {
    const items = await prisma.item.findMany({
      where: {
        dateTime: {
          not: null,
          gte: startDate,
          lt: endDate,
        }
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
  const { tags, subItems, userId, ...dataWithoutTagsAndSubItems } = data;
  
  try {
    const newItem = await prisma.item.create({
      data: dataWithoutTagsAndSubItems,
    });
    for (const tagName of tags) {
      let tag = await prisma.tag.findFirst({
        where: {
          AND: [
            { name: tagName },
            { userId: userId }
          ]
        }
      });
      if (!tag) {
        tag = await prisma.tag.create({
          data: {
            name: tagName,
            user: {
              connect: { id: userId }
            }
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
  const { tags, subItems, userId, ...dataWithoutTagsAndSubItems } = data;
  try {
    const updatedItem = await prisma.item.update({
      where: {
        id: id
      },
      data: dataWithoutTagsAndSubItems,
    });
    if (tags?.addedTags?.length > 0) {
      for (const tagName of tags.addedTags) {
        let tag = await prisma.tag.findFirst({
          where: {
            AND: [
              { name: tagName },
              { userId: userId }
            ]
          }
        });
        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              user: {
                connect: { id: userId }
              }
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
    if (tags?.deletedTags?.length > 0) {
      for (const tagName of tags.deletedTags) {
        const tag = await prisma.tag.findFirst({
          where: {
            AND: [
              { name: tagName },
              { userId: userId }
            ]
          }
        });
        await prisma.item.update({
          where: { id: updatedItem.id },
          data: {
            tags: {
              disconnect: { id: tag?.id }
            }
          }
        });
        const disconnectedTag = await prisma.tag.findFirst({
          where: {
            AND: [
              { name: tagName },
              { userId: userId }
            ]
          },
          include: {
            items: true,
          }
        });
        if (disconnectedTag?.items?.length === 0) {
          await prisma.tag.delete({
            where: {
              id: disconnectedTag.id,
            }
          });
        };
      }
    }
    return Response.json({ ok: true, item: updatedItem });
  } catch (error) {
    return Response.json({ ok: false, error });
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