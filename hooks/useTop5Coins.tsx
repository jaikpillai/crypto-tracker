import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CoinRankingAPI } from "../remote_api/CoinRanking";
import {
  Coin,
  CoinsQueryResponse,
  CoinsStats,
} from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useTop5Coins = (defaultCoins: Coin[] = [], params?: {}) => {
  const [top5Coins, setTop5Coins] = useState<Coin[]>(defaultCoins);
  let coinAPI = new CoinRankingAPI();
  const { currency } = useCurrency();

  let cancel: () => void;
  const fetchTop5Coins = async (params?: {}) => {
    try {
      //  setLoading(true);
      let coins: CoinsQueryResponse = await coinAPI
        .top5CoinsQuery({ ...params, referenceCurrencyUuid: currency?.uuid })
        .fetch({
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

      setTop5Coins(coins.data.coins);
      //  setStats(coins.data.stats);
      //  setLoading(false);
    } catch (e) {
      //  setLoading(false);
      if (axios.isCancel(e)) return;
    }
  };

  useEffect(() => {
    if (currency?.default !== 1) {
      fetchTop5Coins();
    }
    return () => cancel && cancel();
  }, [currency, params]);

  return { top5Coins, fetchTop5Coins };
};
