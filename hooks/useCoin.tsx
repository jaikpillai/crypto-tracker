import { useEffect, useState } from "react";
import {
  CoinRankingAPI,
  DEFAULT_COIN,
  DetailedCoin,
} from "../remote_api/CoinRanking";
import { useCoinHistoricalData } from "./useCoinHistoricalData";
import { useCurrency } from "./useCurrency";

export const useCoin = (uuid: string, coin: DetailedCoin) => {
  const [coinData, setCoinData] = useState<DetailedCoin>(coin);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        let coinData = await new CoinRankingAPI()
          .coinDetailsQuery(uuid, {
            referenceCurrencyUuid: currency?.uuid,
            timePeriod: "1h",
          })
          .fetch();
        let coin = coinData.data.coin;

        setCoinData(coin);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };

    if (currency?.uuid) {
      fetch();
    }
  }, [uuid, currency]);
  return { coinData, loading };
};
