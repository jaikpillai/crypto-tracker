import { NextPage } from "next";
import { useEffect } from "react";

import { useCoinsList, useCurrency, useTop5Coins } from "../../../hooks/";

import { Coin } from "../../../remote_api/CoinRanking";
import { CoinsTable } from "../../CoinsTable/CoinsTable";
import { Header } from "../../Header/Header";

interface IHomepage {
  top5Coins: Coin[];
  coins: Coin[];
}

export const Homepage: NextPage<IHomepage> = ({ top5Coins, coins }) => {
  const { top5Coins: _top5Coins } = useTop5Coins(top5Coins);
  const { coins: _allCoins, loading, setParams } = useCoinsList(coins);

  return (
    <div className="h-screen bg-neutral-800 bg-gradient-to-t from-black via-gray-800 to-gray-800 overflow-y-auto">
      <Header
        headingText="Top Crypto"
        subHeading="A Cryptocurrency tracker"
        callToAction={{ text: "Visit", link: "/" }}
        top5Coins={_top5Coins}
      />
      {/* <input
        type="text"
        name=""
        id=""
        onChange={(e) => setParams({ search: e.target.value })}
      /> */}
      <div className="relative">
        <CoinsTable coins={_allCoins} />
        {loading === true && (
          <div className="absolute  bg-black/20 backdrop-blur-sm inset-0"></div>
        )}
      </div>
    </div>
  );
};
