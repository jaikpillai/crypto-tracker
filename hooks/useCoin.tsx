import { useEffect, useState } from "react";
import CoinRankingAPI, { DetailedCoin } from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useCoin = (uuid: string, preLoadedCoin: DetailedCoin) => {
  const [coinData, setCoinData] = useState<DetailedCoin>(preLoadedCoin);
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();

  const fetchCoin = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      let coinData = await new CoinRankingAPI()
        .getCoinDetails(uuid, {
          referenceCurrencyUuid: currency?.uuid,
          timePeriod: "1h",
        })
        .fetch({ signal: signal });
      let coin = coinData.data.data.coin;

      setCoinData(coin);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (currency?.uuid) {
      fetchCoin(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [currency, uuid]);

  return { coinData, loading };
};
