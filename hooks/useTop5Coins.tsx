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

  const fetchTop5Coins = async (params?: {}) => {
    let cancel: () => void;

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
    fetchTop5Coins();
  }, [currency, params]);

  return { top5Coins, fetchTop5Coins };
};
