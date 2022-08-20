import { useContext, useEffect, useState } from "react";
import { CurrecyContext } from "../contexts/CurrencyContext";
import { Currency } from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";

export const useCurrency = () => {
  const { currency, setCurrency } = useContext(CurrecyContext);
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function formatPrice(price: string, precision: number = 4) {
    let symbol = currency?.sign ? currency.sign : currency.symbol;
    let amount =
      Number(price) <= 0
        ? Number(price).toFixed(precision)
        : Number(Number(price).toFixed(precision)).toLocaleString();
    if (mounted) {
      switch (currency.type) {
        case "fiat":
          return symbol + amount;
        default:
          symbol = currency.symbol;
          return amount + " " + symbol;
      }
    }
  }

  const fetchCurrencies = async (params?: {}) => {
    let _currencies = await axiosPublic({
      url: "/reference-currencies",
      params: { limit: "10", ...params },
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
