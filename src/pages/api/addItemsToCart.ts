import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";

type Data = {
  status: any
}

async function addItemsToCart(emailString: string, itemName: string, quantity: number){ 
    const multiQuery: any = await prisma.$queryRaw`SELECT users_uid, cart_id FROM users JOIN cart ON users.users_uid = user_id;`;

    const itemsIDQuery: any = await prisma.$queryRaw`SELECT items_uid FROM items WHERE title = ${itemName}`;
    const itemID: string = itemsIDQuery[0].items_uid;

    ///Check if item is already added
    const itemAddedQuery: any = await prisma.$queryRaw`SELECT cartitems_uid FROM cartitems WHERE cart_id = ${multiQuery[0].cart_id}::UUID AND item_id = ${itemID}::UUID`;

    ///If item hasn't been added to the cart
    if(itemAddedQuery.length === 0){
        const addFirstItemQuery = await prisma.$executeRaw`INSERT INTO cartitems(cartitems_uid, cart_id, item_id, quantity) VALUES(uuid_generate_v4(), ${multiQuery[0].cart_id}::UUID, ${itemID}::UUID, ${quantity})`;
    }else{
        const itemAdded: string = itemAddedQuery[0].cartitems_uid;

        if(quantity === 0){
            const deleteItemFromCart = await prisma.$executeRaw`DELETE FROM cartitems WHERE cartitems_uid = ${itemAdded}::UUID`;
        }else{
            const increaseCartItemsQuery = await prisma.$executeRaw`UPDATE cartitems SET quantity = ${quantity} WHERE cartitems_uid = ${itemAdded}::UUID`;
        }
    }

  
    ///Update cart here
    return null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = req.body;
    const response = await addItemsToCart(data.email, data.itemName, data.quantity);
    res.status(200).json({ status: "Successful" });
}