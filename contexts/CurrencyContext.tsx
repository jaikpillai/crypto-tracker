import { createContext, useEffect, useLayoutEffect, useState } from "react";
import {
  CoinRankingAPI,
  Currency,
  getDefaultCurrency,
  INR_CURRENCY,
  US_DOLLAR_CURRENCY,
} from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";
import cookies from "js-cookie";

interface ICurrecyContext {
  currency: Currency | null;
  defaultCurrencyList: Currency[];
  setCurrency: (cur: Currency) => void;
}

export const CurrecyContext = createContext<ICurrecyContext>({
  currency: getDefaultCurrency(),
  defaultCurrencyList: [],
  setCurrency: () => {},
});

interface ICurrencyProvider {
  children: React.ReactNode;
}

export const CurrencyProvider: React.FunctionComponent<ICurrencyProvider> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [defaultCurrencyList, setDefaultCurrencyList] = useState<Currency[]>(
    []
  );
  let coinAPI = new CoinRankingAPI();

  const fetchCurrencies = async (params?: {}, _signal?: AbortSignal) => {
    let _currencies = await axiosPublic({
      url: "/reference-currencies",
      params: { limit: "20", ...params },
      signal: _signal,
    });

    setDefaultCurrencyList(_currencies.data.data.currencies);
  };

  function setCurrencyCookie() {
    cookies.set("currency", JSON.stringify(currency));
  }

  useEffect(() => {
    fetchCurrencies();
    setCurrency(getDefaultCurrency());
  }, []);

  useEffect(() => {
    setCurrencyCookie();
  }, [currency]);

  return (
    <CurrecyContext.Provider
      value={{ currency, setCurrency, defaultCurrencyList }}
    >
      {children}
    </CurrecyContext.Provider>
  );
};
