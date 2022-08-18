import { useContext, useEffect, useState } from "react";
import { CurrecyContext } from "../contexts/CurrencyContext";

export const useCurrency = () => {
  const { currency, setCurrency } = useContext(CurrecyContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function formatPrice(price: string, precision: number = 4) {
    return (
      mounted &&
      currency?.sign + Number(Number(price).toFixed(precision)).toLocaleString()
    );
  }

  const getTrend = (change: string) => {
    return mounted && Number(change) >= 0 ? "up" : "down";
  };

  return { currency, setCurrency, formatPrice, getTrend };
};
