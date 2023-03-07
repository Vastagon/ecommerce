import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


type Data = {
  cartNumber: any
}

async function getCart(data: any){
  const result = await prisma.users.findUnique({
    where:{
      email: data.email
    }
  })

  if(result){
    return result
  }else{
    const create = await prisma.users.create({
      data:{
        email: data.email,
        username: data.username
      }
    })
  }

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await getCart(data)
  res.status(200).json({ cartNumber: response })
}
