import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";
import { useCoinsList, useCurrency } from "../../hooks";
import { Coin, CoinsStats } from "../../remote_api/CoinRanking";
import { Triangle } from "../Shapes";

interface IChoinChart {
  coins: Coin[];
  stats: CoinsStats | undefined;
  setParams: (params: {}) => void;
  currentPage?: number;
  loading?: boolean;
  limit?: number;
}

export const CoinsTable: React.FunctionComponent<IChoinChart> = ({
  coins: _coins,
  stats,
  setParams,
  currentPage = 1,
  loading,
  limit = 50,
}) => {
  const { formatPrice, getTrend, currency } = useCurrency();
  const router = useRouter();

  const goToPage = (n: number) => {
    router.push(`/charts/${n}`);
  };
  if (_coins.length === 0 && loading === false)
    return (
      <div className="w-full pt-10 h-screen overflow-x-auto lg:justify-center text-white bg-black/20 backdrop-blur-sm px-4 xl:px-40">
        <p>Page limit</p>
      </div>
    );
  return (
    <div className="w-full pt-10 min-h-screen overflow-x-auto lg:justify-center text-white bg-black/20 backdrop-blur-sm px-4 xl:px-40">
      <table className="border-collapse table-auto w-full h-full text-start">
        <thead className="border-b-2 border-slate-700">
          <tr>
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Symbol</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">7d %</th>
            <th className="text-left p-4">Market Cap</th>
            <th className="text-left p-4">24H Volume</th>
            <th className="text-left p-4"> Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {_coins.map((coin) => {
            return (
              <tr key={coin.uuid} className="text-left hover:bg-black/40">
                <td className="p-4 border-b border-slate-700  ">
                  <p className="text-left">{coin.rank}</p>
                </td>
                <td className="p-4 border-b border-slate-700 ">
                  <Link shallow={true} href={`/coin/${coin.uuid}`}>
                    <a className="flex items-center gap-4">
                      <Image
                        className=""
                        objectFit="contain"
                        height={30}
                        width={30}
                        src={coin.iconUrl?.split("?")[0] || "/"}
                      />

                      <p className="text-left truncate">{coin.name}</p>
                    </a>
                  </Link>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <p className="bg-gray-700 inline-flex pl-2 pr-2 rounded-md">
                    {coin.symbol}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <p className="">{formatPrice(coin.price)}</p>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <div className="flex items-center gap-4">
                    {getTrend(coin.change) === "up" ? (
                      <Triangle
                        w={15}
                        h={10}
                        direction="top"
                        color="fill-green-500"
                      />
                    ) : (
                      <Triangle
                        w={15}
                        h={10}
                        direction="bottom"
                        color="fill-red-500"
                      />
                    )}

                    <p
                      className={`${
                        getTrend(coin.change) === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.change}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <p>{formatPrice(coin.marketCap)}</p>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <p>{formatPrice(coin["24hVolume"])}</p>
                </td>
                <td className="p-4 border-b border-slate-700">
                  <div className="w-32 h-full">
                    <Sparklines
                      limit={25}
                      data={coin.sparkline.map((e) => Number(e))}
                    >
                      <SparklinesLine
                        style={{
                          fill: `${
                            getTrend(coin.change) === "up"
                              ? "#22c55e"
                              : "#ef4444"
                          }`,
                          strokeWidth: 2,
                          stroke: `${
                            getTrend(coin.change) === "up"
                              ? "#22c55e"
                              : "#ef4444"
                          }`,
                        }}
                      />
                      {/* <SparklinesNormalBand /> */}
                    </Sparklines>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <p className="text-sm">
        Showing {currentPage * limit - (limit - 1)} -{" "}
        {stats?.total && currentPage * limit + (_coins.length - limit)} out of{" "}
        {stats?.total}
      </p>
      {_coins.length >= 0 && (
        <PaginationNumbers
          currentPage={currentPage}
          totalEntries={stats?.total}
          entriesPerPage={limit}
          onClick={goToPage}
        />
      )}
    </div>
  );
};

const PaginationNumbers: React.FunctionComponent<{
  currentPage?: number;
  entriesPerPage: number;
  totalEntries: number | undefined;
  onClick: (n: number) => void;
}> = ({ entriesPerPage, totalEntries, onClick, currentPage }) => {
  const pageNumbers: number[] = [];
  const pageBuffer = 6;
  useEffect(() => {}, [currentPage]);

  if (totalEntries) {
    for (let i = 0; i < Math.ceil(totalEntries / entriesPerPage); i++) {
      pageNumbers.push(i + 1);
    }
  }

  if (currentPage) {
    const leftEdge =
      currentPage > pageBuffer - 2 ? pageNumbers.indexOf(currentPage) - 2 : 0;

    const rightEdge =
      currentPage + pageBuffer - 2 < pageNumbers[pageNumbers.length - 1]
        ? pageNumbers.indexOf(currentPage) + 3
        : pageNumbers.indexOf(pageNumbers.length) + 1;
    return (
      <nav className="p-2 text-sm">
        <ul className="flex gap-1 w-full items-center justify-center">
          {/* Left Arrow */}
          {currentPage != 1 && (
            <svg
              onClick={() => onClick(currentPage - 1)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
          {currentPage > pageBuffer - 2 && (
            <>
              <li
                className="cursor-pointer"
                onClick={() => {
                  onClick(1);
                }}
              >
                1
              </li>
              <li
                className="pl-2 text-gray-500 cursor-pointer"
                onClick={() => {
                  onClick(pageBuffer - 2);
                }}
              >
                ...
              </li>
            </>
          )}
          {pageNumbers.slice(leftEdge, rightEdge).map((n) => {
            return (
              <li
                className={`p-2 rounded-md cursor-pointer w-8 flex items-center justify-center ${
                  n === currentPage && "bg-primary-400 text-black"
                }`}
                key={n}
                onClick={() => {
                  onClick(n);
                }}
              >
                {n}
              </li>
            );
          })}

          {currentPage + 4 < pageNumbers[pageNumbers.length - 1] && (
            <>
              <li
                className="pr-2 text-gray-500 cursor-pointer"
                onClick={() => {
                  onClick(pageNumbers[pageNumbers.length - 1] - pageBuffer + 2);
                }}
              >
                ...
              </li>

              <li
                className="cursor-pointer"
                onClick={() => {
                  onClick(pageNumbers[pageNumbers.length - 1]);
                }}
              >
                {pageNumbers[pageNumbers.length - 1]}
              </li>
            </>
          )}
          {/* Right Arrow */}

          {currentPage != pageNumbers[pageNumbers.length - 1] && (
            <svg
              onClick={() => onClick(currentPage + 1)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </ul>
      </nav>
    );
  }
  return null;
};
