// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  updatedCart: any
}

async function deleteItem(item: string, email: string){
    ///
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = req.body;
    ///Correct string being received  
    const response = await deleteItem(data.title, data.email);
    res.status(200).json({ updatedCart: response });
}
