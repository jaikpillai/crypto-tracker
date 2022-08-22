import BigNumber from "bignumber.js";
import { useContext, useEffect, useState } from "react";
import { CurrecyContext } from "../contexts/CurrencyContext";
import { Currency } from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";

export const useCurrency = () => {
  const { currency, setCurrency, defaultCurrencyList } =
    useContext(CurrecyContext);
  const [currencyList, setCurrencyList] =
    useState<Currency[]>(defaultCurrencyList);

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

  const fetchCurrencies = async (params?: {}, _signal?: AbortSignal) => {
    let _currencies = await axiosPublic({
      url: "/reference-currencies",
      params: { limit: "10", ...params },
      signal: _signal,
    });
    setCurrencyList(_currencies.data.data.currencies);
  };

  function formatNumber(num: string, precision: number = 4) {
    return mounted && Number(Number(num).toFixed(precision)).toLocaleString();
  }

  const getTrend = (change: string) => {
    return mounted && Number(change) >= 0 ? "up" : "down";
  };

  return {
    currency,
    setCurrency,
    formatPrice,
    getTrend,
    formatNumber,
    fetchCurrencies,
    currencyList,
  };
};

function determineDecimals(n: number) {
  var log10 = n ? Math.floor(Math.log10(n)) : 0;
  return Math.abs(log10);
}
