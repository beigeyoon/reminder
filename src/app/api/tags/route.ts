import { NextRequest } from "next/server";
import prisma from "@/prisma/db";


export async function POST (req: NextRequest) {
  const data = await req.json();
  try {
    const newTag = await prisma.tag.create({
      data,
    });
    return Response.json(newTag);
  } catch (error) {
    return Response.json(error);
  }
};