import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  storeCards: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ storeCards: "ASDDAS" });
}