import axios, { Canceler, CancelToken, CancelTokenSource } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import CoinRankingAPI, { Exchange } from "../remote_api/CoinRanking";
import { Coin, CoinsStats } from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";
import axiosRateLimit from "axios-rate-limit";

export const useExchangeList = (uuid: string, _params?: {}) => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [params, setParams] = useState(_params);
  const [stats, setStats] = useState<CoinsStats>();
  const [loading, setLoading] = useState(true);
  const { currency } = useCurrency();
  let coinAPI = new CoinRankingAPI();

  const axiosLimited = axiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
    maxRPS: 2,
  });

  const fetchAllExchanges = async (signal?: AbortSignal) => {
    setLoading(true);

    try {
      let results = await new CoinRankingAPI()
        .getExchanges(uuid, {
          referenceCurrencyUuid: currency?.uuid,
          ...params,
        })
        .fetch({ signal: signal });

      setExchanges(results.data.data.exchanges);
      setStats(results.data.data.stats);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (currency?.uuid) {
      fetchAllExchanges(signal);
    }
    return () => {
      controller.abort();
    };
  }, [currency, uuid, params]);

  return { exchanges, stats, fetchAllExchanges, loading, setParams };
};
