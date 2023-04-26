import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";


type Data = {
  storeCards: any
}

async function returnCards() {
  // const data = await prisma.items.findMany()
  // const res = await prisma.$queryRaw`SELECT * FROM items ORDER BY rating DESC LIMIT 20`;

  const res = await prisma.$queryRaw`SELECT * FROM items LIMIT 20`;

  return res;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await returnCards();
  res.status(200).json({ storeCards: response });
}
