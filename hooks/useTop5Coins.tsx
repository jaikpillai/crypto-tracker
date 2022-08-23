import { useEffect, useState } from "react";
import CoinRankingAPI, { Coin } from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useTop5Coins = () => {
  const [top5Coins, setTop5Coins] = useState<Coin[]>();
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();

  const fetchCoin = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      let coinData = await new CoinRankingAPI()
        .getTop5Coins({
          referenceCurrencyUuid: currency?.uuid,
          timePeriod: "1h",
        })
        .fetch({ signal: signal });
      let coins = coinData.data.data.coins;

      setTop5Coins(coins);
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
  }, [currency]);

  return { top5Coins, loading };
};
