import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../components/prisma"

type Data = {
  status: any
}

async function addItemsToCart(emailString: string, itemName: string){ 
  const userIDQuery: any = await prisma.$queryRaw`SELECT users_uid FROM users WHERE email = ${emailString}`
  const userID: string = userIDQuery[0].users_uid

  const cartIDQuery: any = await prisma.$queryRaw`SELECT cart_uid FROM cart WHERE user_id = ${userID}::UUID`
  const cartID: string = cartIDQuery[0].cart_uid

  const itemsIDQuery: any = await prisma.$queryRaw`SELECT items_uid FROM items WHERE title = ${itemName}`
  const itemID: string = itemsIDQuery[0].items_uid

  // console.log(itemID, cartID, userID)

  ///Want to search with the cart_id and the item_id to see if it exists already

  ///Check if item is already added
  const itemAddedQuery: any = await prisma.$queryRaw`SELECT cartitems_uid FROM cartitems WHERE cart_id = ${cartID}::UUID AND item_id = ${itemID}::UUID`
  const itemAdded: string = itemAddedQuery[0].cartitems_uid
  console.log(itemAdded)

  ///If item hasn't been added to the cart
  if(itemAddedQuery.length === 0){
    const addFirstItemQuery = await prisma.$queryRaw`INSERT INTO cartitems(cartitems_uid, cart_id, item_id, quantity) VALUES(uuid_generate_v4(), ${cartID}::UUID, ${itemID}::UUID, 1)`
  }else{
    // const increaseCartItemsQuery = await prisma.$queryRaw`UPDATE cartitems SET quantity = SUM(quantity+1) WHERE cartitems_uid = ${itemAdded}::UUID`
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
  res.status(200).json({ status: "Successful" })
}