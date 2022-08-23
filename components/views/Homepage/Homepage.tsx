import { NextPage } from "next";
import { useEffect } from "react";

import { useCoinsList, useCurrency } from "../../../hooks/";

import { Coin, CoinsStats } from "../../../remote_api/CoinRanking";
import { CoinsTable } from "../../CoinsTable/CoinsTable";
import { Header } from "../../Header/Header";

interface IHomepage {
  top5Coins: Coin[];
  coins: Coin[];
  stats: CoinsStats;
}

export const Homepage: NextPage<IHomepage> = ({ top5Coins, coins, stats }) => {
  // const { top5Coins: _top5Coins } = useTop5Coins(top5Coins);
  const { coins: _allCoins, loading, limit } = useCoinsList(coins);

  return (
    <div className="h-max w-full bg-neutral-800 bg-gradient-to-t from-black via-gray-800 to-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <Header
        headingText="Top Crypto"
        subHeading="A Cryptocurrency tracker"
        callToAction={{ text: "Visit", link: "/" }}
        top5Coins={_allCoins.slice(0, 5)}
      />

      <div className="relative">
        <CoinsTable
          stats={stats}
          coins={_allCoins}
          currentPage={1}
          loading={loading}
          limit={limit}
        />
        {loading === true && (
          <div className="absolute  bg-black/20 backdrop-blur-sm inset-0"></div>
        )}
      </div>
    </div>
  );
};
