import { useEffect, useState } from "react";
import api, { requests } from "../api/coin_ranking";

const useCoinsList = () => {
  let cancel: () => void;

  const fetchCoins = async () => {
    let coins = await api({
      method: "get",
      url: "https://crypto-tracker-silk.vercel.app/api/coins",
    });

    console.log(coins.data);
    return () => cancel();
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return <div>Enter</div>;
};

export default useCoinsList;
