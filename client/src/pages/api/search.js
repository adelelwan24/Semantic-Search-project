import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("At The API");

  res.status(200).json({message: "hi"});
}


