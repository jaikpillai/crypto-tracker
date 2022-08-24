import axios from "axios";
import BigNumber from "bignumber.js";
import { useContext, useEffect, useState } from "react";
import { CurrecyContext } from "../contexts/CurrencyContext";
import { Currency } from "../remote_api/CoinRanking";
import CoinRankingAPI from "../remote_api/CoinRanking/CoinRanking";

export const useCurrency = () => {
  const { currency, setCurrency, defaultCurrencyList } =
    useContext(CurrecyContext);
  const [currencyList, setCurrencyList] =
    useState<Currency[]>(defaultCurrencyList);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function formatPrice(price: string, precision: number = 3) {
    let symbol = currency?.sign ? currency.sign : currency?.symbol;

    let amount =
      BigNumber(price) < BigNumber(1)
        ? BigNumber(price).toFormat(
            determineDecimals(Number(price)) + 2,
            BigNumber.ROUND_DOWN
          )
        : BigNumber(
            BigNumber(price).toFixed(3, BigNumber.ROUND_DOWN)
          ).toFormat();
    if (mounted) {
      switch (currency?.type) {
        case "fiat":
          return symbol + amount;
        default:
          symbol = currency?.symbol;
          return amount + " " + symbol;
      }
    }
    return "";
  }

  const fetchCurrencies = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const result = await new CoinRankingAPI()
        .getCurrencies(query, { limit: "10" })
        .fetch({ signal: signal });
      const currencies = result.data.data.currencies;
      setCurrencyList(currencies);
      setLoading(false);
    } catch (e) {
      if (!axios.isCancel(e)) {
        setLoading(false);
      }
    }
  };

  function formatNumber(num: string, precision: number = 4) {
    return mounted && Number(Number(num).toFixed(precision)).toLocaleString();
  }

  const getTrend = (change: string) => {
    return mounted && Number(change) >= 0 ? "up" : "down";
  };

  useEffect(() => {
    const controller = new AbortController();
    if (query.length > 0) {
      fetchCurrencies(controller.signal);
    } else if (query.length === 0) {
      setCurrencyList(defaultCurrencyList);
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    currency,
    loading,
    setCurrency,
    formatPrice,
    getTrend,
    formatNumber,
    fetchCurrencies,
    currencyList,
    setQuery,
  };
};

function determineDecimals(n: number) {
  var log10 = n ? Math.floor(Math.log10(n)) : 0;
  return Math.abs(log10);
}
