import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const listId = searchParams.get('listId');
  try {
    const sections = await prisma.section.findMany({
      where: {
        listId: listId as string,
      },
      include: {
        items: true,
      }
    });
    return Response.json(sections);
  } catch (error) {
    return Response.json(error);
  }
};

export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newSection = await prisma.section.create({
      data,
    });
    return Response.json(newSection);
  } catch (error) {
    return Response.json(error);
  }
};

export async function PUT (req: NextRequest) {
  const { id, data } = await req.json();
  try {
    const updatedSection = await prisma.section.update({
      where: {
        id: id
      },
      data: data,
    });
    return Response.json(updatedSection);
  } catch (error) {
    return Response.json(error);
  }
};

export async function DELETE (req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedSection = await prisma.section.delete({
      where: {
        id: id
      }
    });
    return Response.json(deletedSection);
  } catch (error) {
    return Response.json(error);
  }
};