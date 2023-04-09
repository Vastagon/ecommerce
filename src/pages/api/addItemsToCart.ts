import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../components/prisma"

type Data = {
  itemInfo: any
}

async function addItemsToCart(emailString: string, itemName: string){
  const oldItems = await prisma.users.findUnique({
    where:{
      email: emailString
    }
  })


  if(oldItems){
    const newCart = [...oldItems.cart, itemName]

    const result = await prisma.users.update({
      where:{
        email: emailString
      },
      data:{
        cart: newCart
      }
    })    

    return result
  }

  ///Update cart here
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await addItemsToCart(data.email, data.itemName)
  res.status(200).json({ itemInfo: response })
}
