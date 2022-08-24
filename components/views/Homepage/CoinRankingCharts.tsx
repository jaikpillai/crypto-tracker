import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useCoinsList, useTop5Coins } from "../../../hooks";

import { Coin } from "../../../remote_api/CoinRanking";
import { CoinsTable } from "../../CoinsTable/CoinsTable";
import { Header } from "../../Header/Header";
import appInfo from "../../../general";

interface Charts {
  coins: Coin[];
}

export const CoinRankingCharts: NextPage<Charts> = ({ coins }) => {
  const { top5Coins } = useTop5Coins();

  const router = useRouter();

  const {
    coins: _allCoins,
    loading,
    setParams,
    stats,
    limit,
  } = useCoinsList(coins);

  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);

  useEffect(() => {
    setPageNumber(Math.abs(Number(router.query.pgno)));
  }, [router]);

  useEffect(() => {
    if (pageNumber) {
      setParams((prev) => {
        return { offset: String((pageNumber - 1) * limit) };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div className="h-max w-full  bg-gradient-to-t from-black/50 via-gray-800/70 to-gray-800/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <Header
        headingText={appInfo.app_name}
        subHeading={appInfo.brief}
        callToAction={{ text: "Visit", link: "/" }}
        top5Coins={top5Coins}
      />

      <div className="relative">
        <CoinsTable
          stats={stats}
          coins={_allCoins}
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
