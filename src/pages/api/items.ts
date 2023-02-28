// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { uuid } from 'uuidv4';

const prisma = new PrismaClient()


type Data = {
  name: string
  id: number
}

async function addItem(){
  // const result = await prisma.items.create({
  //   data: {
  //     id: 312,
  //     name: "NAME",
  //     rating: 3,
  //     imagePath: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Milad_Kharchegani_at_the_2016_Summer_Olympics.jpg",
  //     price: 23
  //   }
  // })

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await addItem()
  res.status(200).json({
    name: 'John Doe',
    id: 0
  })
}
