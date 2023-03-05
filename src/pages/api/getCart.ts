import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


type Data = {
  cartNumber: any
}

async function getCart(email: string){
  try{
    const result = await prisma.users.findUnique({
      where:{
        email: email
      }
    })

    return result
  }
  catch{
    ///Create new here for user
    const result = await prisma.users.findUnique({
      where:{
        email: email
      }
    })
    
    return result
  }

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await getCart(data.email)
  res.status(200).json({ cartNumber: response })
}
