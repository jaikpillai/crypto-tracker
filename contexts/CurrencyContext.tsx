import { createContext, useEffect, useLayoutEffect, useState } from "react";
import {
  CoinRankingAPI,
  Currency,
  INR_CURRENCY,
  US_DOLLAR_CURRENCY,
} from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";

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
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  let coinAPI = new CoinRankingAPI();

  return (
    <CurrecyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrecyContext.Provider>
  );
};
