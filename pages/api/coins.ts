import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../api/CoinRanking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let params = req.query;

  let coins = await axios({
    url: "/coins",
    params: params,
  });
  res.status(200).json(coins.data.data);
}
