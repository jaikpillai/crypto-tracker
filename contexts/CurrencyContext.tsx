import { createContext, useEffect, useState } from "react";
import {
  CoinRankingAPI,
  Currency,
  INR_CURRENCY,
  US_DOLLAR_CURRENCY,
} from "../remote_api/CoinRanking";

interface ICurrecyContext {
  currency: Currency;
  setCurrency: (cur: Currency) => void;
}

export const CurrecyContext = createContext<ICurrecyContext>({
  currency: US_DOLLAR_CURRENCY,
  setCurrency: () => {},
});

interface ICurrencyProvider {
  children: React.ReactNode;
}

export const CurrencyProvider: React.FunctionComponent<ICurrencyProvider> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<Currency>(US_DOLLAR_CURRENCY);
  let coinAPI = new CoinRankingAPI();

  const fetchCurrencies = async (params?: {}) => {
    let _currencies = await coinAPI.getCurrencies(params).fetch();
    console.log(_currencies);
  };

  return (
    <CurrecyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrecyContext.Provider>
  );
};
