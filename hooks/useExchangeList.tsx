import axios, { Canceler, CancelToken, CancelTokenSource } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { CoinRankingAPI, Exchange } from "../remote_api/CoinRanking";
import {
  Coin,
  CoinsQueryResponse,
  CoinsStats,
} from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";
import axiosRateLimit from "axios-rate-limit";

export const useExchangeList = (uuid: string, _params?: {}) => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [params, setParams] = useState(_params);
  const [stats, setStats] = useState<CoinsStats>();
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  let coinAPI = new CoinRankingAPI();

  const axiosLimited = axiosRateLimit(axios.create(), {
    maxRequests: 5,
    perMilliseconds: 1000,
    maxRPS: 2,
  });

  const fetchAllExchanges = async (signal?: AbortSignal) => {
    setLoading(true);
    // let coins: CoinsQueryResponse = await coinAPI
    //   .allCoinsQuery({ ...params, referenceCurrencyUuid: currency.uuid })
    //   .fetch({
    //     signal: signal,
    //   });

    // let coins = await axiosLimited({
    //   url: "/api/coins",
    //   method: "get",
    //   params: {
    //     referenceCurrencyUuid: "yhjMzLPhuIDl",
    //     timePeriod: "7d",
    //     "tiers[0]": "1",
    //     orderBy: "marketCap",
    //     orderDirection: "desc",
    //     limit: "50",
    //     ...params,
    //   },
    //   signal: signal,
    // });
    try {
      let res = await axiosLimited({
        headers: {
          // "x-access-token": process.env.COINRANKING_APIKEY || "",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API || "",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
        url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/exchanges`,
        method: "get",
        params: {
          referenceCurrencyUuid: currency?.uuid,
          orderDirection: "desc",
          limit: "50",
          ...params,
        },
        signal: signal,
      });

      setLoading(false);
      setExchanges(res.data.data.exchanges);
      setStats(res.data.data.stats);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllExchanges();
  }, [currency]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   fetchAllCoins(signal);

  //   return () => {
  //     controller.abort();
  //   };
  // }, [params]);

  return { exchanges, stats, fetchAllExchanges, loading, setParams };
};
