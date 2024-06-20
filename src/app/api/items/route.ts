import { NextRequest } from "next/server";
import prisma from "@/prisma/db";
import dayjs from "dayjs";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const listId = searchParams.get('listId');
  const isTodayPreset = listId === 'today-list';
  const isScheduledPreset = listId === 'scheduled-list';
  const isCheckedPreset = listId === 'checked-list';
  const year = searchParams.get('year') as string;
  const month = searchParams.get('month') as string;
  const filterByCalendar = year.length > 0 && month.length > 0;
  const tagId = searchParams.get('tagId') as string;
  const keyword = searchParams.get('keyword') as string;
  const filterByTagId = tagId.length > 0;
  const filterByKeyword = keyword.length > 0;

  const today = dayjs().startOf('day').toDate();
  const tomorrow = dayjs(today).add(1, 'day').toDate();

  let items;
  try {
    if (filterByCalendar) {
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
    } else if (filterByTagId) {
      // 입력된 TagId에 해당하는 Tag를 포함하는 아이템
      items = await prisma.item.findMany({
        where: {
          tags: {
            some: {
              id: tagId,
            },
          },
        },
        include: {
          tags: true,
          subItems: true,
        },
      });
    } else if (filterByKeyword) {
      // 입력된 keyword를 item의 title이나 url이나 memo가 포함하는 경우
      items = await prisma.item.findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              url: {
                contains: keyword,
              },
            },
            {
              memo: {
                contains: keyword,
              },
            },
          ],
        },
        include: {
          tags: true,
          subItems: true,
        },
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
            // item의 dateTime이 오늘 이후인 것 또는 item의 dateTime이 오늘 이전이지만 checked가 false인 것, 그리고 item의 dateTime이 null인 것, 그리고 item의 dateTime이 오늘 이후이지만 checked가 true라면 포함하지 않음
            OR: [
              {
                dateTime: {
                  gt: today,
                },
                checked: false,
              },
              {
                dateTime: null,
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
    console.log('🩷🩷🩷🩷🩷', error);
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