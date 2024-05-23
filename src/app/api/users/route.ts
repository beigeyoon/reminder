import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

type UserSelect = {
  id?: boolean;
  name?: boolean;
  password?: boolean;
}

export async function GET (req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get('name');
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        name: name as string,
      },
      select: {
        id: true,
        name: true,
        password: true,
      } as UserSelect
    });
    return Response.json(userInfo);
  } catch (error) {
    return Response.json(error);
  }
};

export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newUser = await prisma.user.create({
      data,
    });
    return Response.json({ ok: true, user: newUser });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
};

export async function DELETE (req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id
      }
    });
    return Response.json({ ok: true, user: deletedUser });
  } catch (error) {
    return Response.json({ ok: false, error});
  }
}