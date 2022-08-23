import { useEffect, useState } from "react";
import CoinRankingAPI from "../remote_api/CoinRanking";
import { Coin, CoinsStats } from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export const useCoinsList = (defaultCoins: Coin[] = [], _params?: {}) => {
  const [coins, setCoins] = useState<Coin[]>(defaultCoins);
  const [limit, setLimit] = useState(50); // limit of no. of results in query
  const [params, setParams] = useState(_params);
  const [stats, setStats] = useState<CoinsStats>();
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  let coinAPI = new CoinRankingAPI();

  const fetchAllCoins = async (params?: {}, signal?: AbortSignal) => {
    setLoading(true);
    try {
      let res = await coinAPI
        .getAllCoins({ ...params, referenceCurrencyUuid: currency?.uuid })
        .fetch({
          signal: signal,
        });

      setLoading(false);
      setCoins(res.data.data.coins);
      setStats(res.data.data.stats);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (currency?.uuid) {
      fetchAllCoins(params, controller.signal);
    }

    return () => {
      controller.abort();
    };
  }, [currency, params, limit]);

  return { coins, stats, fetchAllCoins, loading, setParams, limit };
};
