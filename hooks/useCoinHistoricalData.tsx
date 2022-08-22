import axios from "axios";
import { useEffect, useState } from "react";
import {
  CoinHistoryData,
  CoinRankingAPI,
  CoinsHistoryQueryResponse,
} from "../remote_api/CoinRanking";
import { useCurrency } from "./useCurrency";

export type TimePeriod =
  | "1h"
  | "3h"
  | "12h"
  | "24h"
  | "7d"
  | "30d"
  | "3m"
  | "1y"
  | "3y"
  | "5y";

export const useCoinHistoricalData = (
  uuid: string,
  defaultHistoricalData: CoinHistoryData[] = [],
  params?: {}
) => {
  const [historicalData, setHistoricalData] = useState<CoinHistoryData[]>(
    defaultHistoricalData
  );
  const [change, setChange] = useState<string>("");
  const [loading, setLoading] = useState(false);
  let coinAPI = new CoinRankingAPI();
  const { currency } = useCurrency();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");

  const fetchHistoricalData = async (params?: {}) => {
    let cancel: () => void;

    try {
      setLoading(true);
      let history: CoinsHistoryQueryResponse = await coinAPI
        .getCoinHistoricalData(uuid, {
          ...params,
          timePeriod: timePeriod,
          referenceCurrencyUuid: currency?.uuid,
          orderBy: "asc",
        })
        .fetch({
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

      setHistoricalData(history.data.history);
      setChange(history.data.change);

      //  setStats(coins.data.stats);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (axios.isCancel(e)) return;
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, params, timePeriod, uuid]);

  return {
    historicalData,
    setHistoricalData,
    setTimePeriod,
    timePeriod,
    change,
    loading,
  };
};
