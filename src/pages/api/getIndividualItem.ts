// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";


type Data = {
  itemInfo: any
}

async function getItem(title: string){
  const result: any = await prisma.$queryRaw`SELECT * FROM items WHERE title = ${title}`;
  const resultDestructured = result[0];

  return resultDestructured;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  const response = await getItem(data.id);
  res.status(200).json({ itemInfo: response });
}
