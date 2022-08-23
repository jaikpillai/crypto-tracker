import axios from "axios";
import { useEffect, useState } from "react";
import CoinRankingAPI, { CoinHistoryData } from "../remote_api/CoinRanking";
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
  const { currency } = useCurrency();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("7d");

  const fetchHistoricalData = async (params?: {}, signal?: AbortSignal) => {
    try {
      setLoading(true);
      let result = await new CoinRankingAPI()
        .getCoinHistoricalData(uuid, {
          ...params,
          timePeriod: timePeriod,
          referenceCurrencyUuid: currency?.uuid,
          orderBy: "asc",
        })
        .fetch({
          signal: signal,
        });

      setHistoricalData(result.data.data.history);
      setChange(result.data.data.change);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (axios.isCancel(e)) return;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (currency?.uuid) {
      fetchHistoricalData({}, controller.signal);
    }
    return () => {
      controller.abort();
    };
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
