import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../components/prisma"


type Data = {
  cart: any
}

async function getCart(data: any){
  const result: any = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${data.email}`

  if(result.length > 0){
    return result
  }else{
    //Create new user if first time logging in
    const createUser = await prisma.$queryRaw`INSERT INTO users(users_uid, username, email, created_at) VALUES(uuid_generate_v4(), ${data.username}, ${data.email}, NOW())`


    //Create new cart if first time logging in
    const user_id_query: any = await prisma.$queryRaw`SELECT users_uid FROM users WHERE email = ${data.email}`
    const user_id = user_id_query[0].users_uid

    const newCart = await prisma.$queryRaw`INSERT INTO cart(cart_uid, user_id, created_at) VALUES (uuid_generate_v4(), ${user_id}::UUID, NOW())`
    ///Returns empty array
    return newCart;
  }

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const response = await getCart(data)

  if(response){
    res.status(200).json({ cart: response.cart })
  }
}
