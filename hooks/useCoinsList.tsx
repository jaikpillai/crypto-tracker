import { useEffect, useState } from "react";
import api, { requests } from "../api/coin_ranking";

const useCoinsList = () => {
  let cancel: () => void;

  const fetchCoins = async () => {
    let coins = await api({
      method: "get",
      url: requests.fetchCoins.url,
      params: {
        ...requests.fetchCoins.params,
      },
    });

    console.log(coins);
    return () => cancel();
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return <div>Enter</div>;
};

export default useCoinsList;
