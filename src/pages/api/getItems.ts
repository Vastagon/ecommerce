// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../components/prisma"


type Data = {
  itemInfo: any
}

async function getItem(path: string){
  const result = await prisma.items.findUnique({
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
  const response = await getItem(data.id)
  res.status(200).json({ itemInfo: response })
}
