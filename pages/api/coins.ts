import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../remote_api/CoinRanking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let params = req.query;

  let coins = await axios({
    headers: {
      // "x-access-token": process.env.COINRANKING_APIKEY || "",
      "X-RapidAPI-Key": process.env.RAPID_API || "",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
    url: "/coins",
    params: params,
  });

  res.status(200).json(coins.data.data);
}
