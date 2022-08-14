import { useEffect, useState } from "react";
import { CoinRankingAPI, DetailedCoin } from "../api/CoinRanking";

export const useCoin = (uuid: string) => {
  const [coinData, setCoinData] = useState<DetailedCoin>();

  useEffect(() => {
    const fetch = async () => {
      let coinData = await new CoinRankingAPI().coinDetailsQuery(uuid).fetch();
      setCoinData(coinData.data);
    };

    fetch();
  }, [uuid]);
  return { coinData };
};
