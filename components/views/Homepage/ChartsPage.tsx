import { NextPage } from "next";
import { useEffect } from "react";

import { useCoinsList, useCurrency } from "../../../hooks/";

import { Coin } from "../../../remote_api/CoinRanking";
import { CoinsTable } from "../../CoinsTable/CoinsTable";
import { Header } from "../../Header/Header";

interface Charts {
  top5Coins: Coin[];
  coins: Coin[];
  pageNumber: number | undefined;
}

export const Charts: NextPage<Charts> = ({ top5Coins, coins, pageNumber }) => {
  // const { top5Coins: _top5Coins } = useTop5Coins(top5Coins);
  const {
    coins: _allCoins,
    loading,
    setParams,
    stats,
    limit,
  } = useCoinsList(coins);

  useEffect(() => {
    if (pageNumber) {
      setParams({ offset: (pageNumber - 1) * limit });
    }
  }, [pageNumber]);

  return (
    <div className="h-max w-full bg-neutral-800 bg-gradient-to-t from-black via-gray-800 to-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <Header
        headingText="Top Crypto"
        subHeading="A Cryptocurrency tracker"
        callToAction={{ text: "Visit", link: "/" }}
        top5Coins={_allCoins.slice(0, 5)}
      />
      {/* <input
        type="text"
        name=""
        id=""
        onChange={(e) => setParams({ search: e.target.value })}
      /> */}
      <div className="relative">
        <CoinsTable
          stats={stats}
          coins={_allCoins}
          setParams={setParams}
          currentPage={pageNumber}
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
