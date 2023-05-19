import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../components/prisma";
import { uuid } from "uuidv4";


type Data = {
  cart_items: any
}

async function getCart(data: any) {
    // const result: any = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${data.email}`
    const user_id_query: any = await prisma.$queryRaw`SELECT users_uid FROM users WHERE email = ${data.email}`;

    ///if user exists
    if (user_id_query.length > 0) {
        const user_id = user_id_query[0].users_uid;
        const cart_id_query: any = await prisma.$queryRaw`SELECT cart_uid FROM cart WHERE user_id = ${user_id}::UUID`;
        const cart_id = cart_id_query[0].cart_uid;

        const cart = await prisma.$queryRaw`SELECT items_uid, title, image_path FROM items JOIN cartitems ON items.items_uid = item_id WHERE cart_id = ${cart_id}::UUID;`;

        return cart;
    } else {
    //Create new user if first time logging in
        const user_id = uuid();

        const createUser = await prisma.$queryRaw`INSERT INTO users(users_uid, username, email, created_at) VALUES(${user_id}::UUID, ${data.username}, ${data.email}, NOW())`;

        //Create new cart if first time logging in
        const cartuid = uuid();
        const newCart = await prisma.$queryRaw`INSERT INTO cart(cart_uid, user_id, created_at) VALUES (${cartuid}::UUID, ${user_id}::UUID, NOW())`;
        const assignCart = await prisma.$queryRaw`UPDATE users SET cart_id = ${cartuid}::UUID WHERE users_uid = ${user_id}::UUID`;

        ///Returns empty array
        return "User created";
    }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = req.body;
    const response = await getCart(data);

    if (response) {
        res.status(200).json({ cart_items: response });
    }
}
