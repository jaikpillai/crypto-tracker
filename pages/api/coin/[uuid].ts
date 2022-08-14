import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../../api/CoinRanking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = req.query;

  let coins = await axios({
    url: `/coin/${query.uuid}`,
    params: query.params,
  });
  res.status(200).json(coins.data.data);
}
