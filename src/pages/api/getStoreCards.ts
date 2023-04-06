import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import prisma from "../../components/prisma"


type Data = {
  storeCards: any
}

async function returnCards(){
    const data = await prisma.items.findMany()
    return data
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await returnCards()
  res.status(200).json({ storeCards: response })
}
