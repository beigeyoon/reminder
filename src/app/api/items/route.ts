import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import dayjs from "dayjs";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const listId = searchParams.get('listId');
  const isTodayPreset = listId === 'today-list';
  const isScheduledPreset = listId === 'scheduled-list';
  const isCheckedPreset = listId === 'checked-list';
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const isFromCalendar = year && month;
  const today = dayjs().startOf('day').toDate();
  const tomorrow = dayjs(today).add(1, 'day').toDate();

  let items;
  try {
    if (isFromCalendar) {
      const startDate = dayjs().year(parseInt(year)).month(parseInt(month) - 1).startOf('month').toDate();
      const endDate = dayjs(startDate).endOf('month').toDate();

      items = await prisma.item.findMany({
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
    } else {
      if (isTodayPreset) {
        items = await prisma.item.findMany({
          where: {
            // item의 dateTime이 오늘에 해당하는 것 또는 item의 dateTime이 오늘 이전이지만 checked가 false인 것
            OR: [
              {
                dateTime: {
                  gte: today,
                  lt: tomorrow,
                }
              },
              {
                dateTime: {
                  lt: today,
                },
                checked: false,
              }
            ]
          },
          include: {
            tags: true,
            subItems: true,
          }
        });
      } else if (isScheduledPreset) {
        items = await prisma.item.findMany({
          where: {
            // item의 dateTime이 오늘 이후인 것 또는 item의 dateTime이 오늘 이전이지만 checked가 false인 것
            OR: [
              {
                dateTime: {
                  gt: today,
                }
              },
              {
                dateTime: {
                  lt: today,
                },
                checked: false,
              }
            ]
          },
          include: {
            tags: true,
            subItems: true,
          }
        });
      } else if (isCheckedPreset) {
        items = await prisma.item.findMany({
          where: {
            // item의 checked가 true인 것
            checked: true,
          },
          include: {
            tags: true,
            subItems: true,
          }
        });
      } else {
        items = await prisma.item.findMany({
          where: {
            ...(listId && { listId }),
          },
          include: {
            tags: true,
            subItems: true,
          }
        });
      }
    }
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