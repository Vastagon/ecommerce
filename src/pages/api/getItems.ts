// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


type Data = {
  itemInfo: any
}

async function getItem(path: any){
  console.log(path)
  const result = await prisma.items.findFirst({
    where:{
      title: path
    }
  })

  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data = req.body

    const response = await getItem(data.name)
    console.log(response)
    res.status(200).json({ itemInfo: response })
}
