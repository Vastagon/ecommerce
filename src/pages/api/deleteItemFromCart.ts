// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../components/prisma"


type Data = {
  updatedCart: any
}

async function deleteItem(item: string, email: string){
    const user = await prisma.users.findUnique({
        where:{
        email: email
        }
    })

    ///Deletes items from cart
    for(let i = 0; i < user!.cart.length ; i++){
        if(user!.cart[i] === item){
            user!.cart.splice(i, 1)
            break;
        }
    }

    ///Updates cart for user
    const res = await prisma.$queryRaw`update users set cart=${user!.cart} where email=${email}`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
    ///Correct string being received  
    const response = await deleteItem(data.title, data.email)
    res.status(200).json({ updatedCart: response })
}
