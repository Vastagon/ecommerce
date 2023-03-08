import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


type Data = {
  itemInfo: any
}

async function updateCart(path: number){
  const result = await prisma.items.findUnique({
    where:{
      id: path
    }
  })
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await updateCart(data.id)
  res.status(200).json({ itemInfo: response })
}
