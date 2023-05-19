import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";


type Data = {
  allItems: any
}

async function returnCards() {
    const allItems: any = await prisma.$queryRaw`SELECT title FROM items;`;

    return { allItems };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await returnCards();
    res.status(200).json({ allItems: response.allItems });
}