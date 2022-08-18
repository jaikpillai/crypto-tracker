import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { CoinRankingAPI } from "../remote_api/CoinRanking";
import {
  Coin,
  CoinsQueryResponse,
  CoinsStats,
} from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useCoinsList = (defaultCoints: Coin[] = [], params?: {}) => {
  const [coins, setCoins] = useState<Coin[]>(defaultCoints);
  const [stats, setStats] = useState<CoinsStats>();
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  let coinAPI = new CoinRankingAPI();

  const fetchAllCoins = async (params?: {}) => {
    let cancel: () => void;

    try {
      setLoading(true);
      let coins: CoinsQueryResponse = await coinAPI
        .allCoinsQuery({ ...params, referenceCurrencyUuid: currency.uuid })
        .fetch({
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

      setLoading(false);
      setCoins(coins.data.coins);
      setStats(coins.data.stats);
    } catch (e) {
      setLoading(false);
      // if (axios.isCancel(e)) return;
    }
  };

  useEffect(() => {
    fetchAllCoins();
    // return () => cancel();
  }, [currency]);

  return { coins, stats, fetchAllCoins, loading };
};
