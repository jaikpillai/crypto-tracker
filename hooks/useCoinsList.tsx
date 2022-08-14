import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { CoinRankingAPI } from "../remote_api/CoinRanking";
import {
  Coin,
  CoinsQueryResponse,
  CoinsStats,
} from "../remote_api/CoinRanking";

const useCoinsList = (params?: {}) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [stats, setStats] = useState<CoinsStats>();
  let coinAPI = new CoinRankingAPI();

  useEffect(() => {
    let cancel: () => void;

    const fetchCoins = async () => {
      try {
        let coins: CoinsQueryResponse = await coinAPI
          .allCoinsQuery(params)
          .fetch({
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          });

        setCoins(coins.data.coins);
        setStats(coins.data.stats);
      } catch (e) {
        if (axios.isCancel(e)) return;
      }
    };

    fetchCoins();
    return () => cancel();
  }, [params]);

  return { coins, stats };
};

export default useCoinsList;
