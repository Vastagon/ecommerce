import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


type Data = {
  itemInfo: any
}

async function addItemsToCart(emailString: string, itemName: string){
  console.log(itemName)
  const result = await prisma.users.update({
    where:{
      email: emailString
    },
    data:{
      cart: [itemName]
    }
  })

  ///Update cart here
  return result
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await addItemsToCart(data.email, data.itemName)
  res.status(200).json({ itemInfo: response })
}
