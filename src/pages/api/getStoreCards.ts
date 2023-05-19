import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";


type Data = {
  pageItems: any
  totalPages: number
}

async function returnCards(pageClicked: number) {
    const pageData = await prisma.$queryRaw`SELECT * FROM items LIMIT 20 OFFSET ${(pageClicked - 1) * 20}`;

    let totalItems: any = await prisma.$queryRaw`SELECT COUNT(*) as totalitems FROM items;`;
    ///Normal query returns a bigInt, so I need to do this to get rid of the n at the end and convert it to a number I can use
    totalItems = parseInt(totalItems[0].totalitems.toString());

    const totalPages = Math.floor(totalItems / 20);

    return { pageData, totalPages };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await returnCards(req.body.pageClicked);
    res.status(200).json({ pageItems: response.pageData, totalPages: response.totalPages });
}
