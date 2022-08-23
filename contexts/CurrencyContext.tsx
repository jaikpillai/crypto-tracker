import { createContext, useEffect, useState } from "react";
import CoinRankingAPI, {
  Currency,
  getDefaultCurrency,
} from "../remote_api/CoinRanking";
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

  const fetchCurrencies = async (signal?: AbortSignal) => {
    let result = await new CoinRankingAPI().getCurrencies().fetch();

    setDefaultCurrencyList(result.data.data.currencies);
  };

  function setCurrencyCookie() {
    cookies.set("currency", JSON.stringify(currency), { expires: 30 });
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchCurrencies(controller.signal);
    setCurrency(getDefaultCurrency());

    return () => {
      controller.abort();
    };
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
