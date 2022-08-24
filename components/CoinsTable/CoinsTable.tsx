import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useCurrency } from "../../hooks";
import { Coin, CoinsStats } from "../../remote_api/CoinRanking";
import { Triangle } from "../Shapes";

interface IChoinChart {
  coins: Coin[];
  stats: CoinsStats | undefined;
  currentPage?: number;
  loading?: boolean;
  limit?: number;
}

type OrderBy = "price" | "marketCap" | "24hVolume" | "change" | "listedAt";
type OrderDirection = "desc" | "asc";
type Filter = {
  orderBy: OrderBy;
  orderDirection: OrderDirection;
};

export const CoinsTable: React.FunctionComponent<IChoinChart> = ({
  coins: _coins,
  stats,
  currentPage = 1,
  loading,
  limit = 50,
}) => {
  const { formatPrice, getTrend } = useCurrency();
  const [filter, setFilter] = useState<Filter>({
    orderBy: "marketCap",
    orderDirection: "desc",
  });
  const router = useRouter();
  const goToPage = (n: number) => {
    router.push(`/charts/${n}`);
  };

  const changeFilter = (filterBy: OrderBy) => {
    setFilter((prev) => {
      return {
        orderBy: filterBy,
        orderDirection:
          prev?.orderBy === filterBy && prev.orderDirection === "desc"
            ? "asc"
            : "desc",
      };
    });
  };

  return (
    <div className="w-full pt-10 pb-10 min-h-screen overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent lg:justify-center text-white bg-black/20 backdrop-blur-sm px-4 xl:px-40">
      {_coins.length > 0 ? (
        <table className="border-collapse table-auto w-full h-full text-start">
          <thead className="border-b-2 border-slate-700">
            <tr>
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Symbol</th>
              <th
                className="text-left p-4 items-center gap-3 select-none cursor-pointer "
                onClick={() => changeFilter("price")}
              >
                <div className="relative flex items-center gap-2">
                  <p>Price</p>
                  <FilterArrow filter={filter} forFilter="price" />
                </div>
              </th>
              <th
                onClick={() => changeFilter("change")}
                className="text-left p-4  items-center gap-3 select-none cursor-pointer "
              >
                <div className="relative flex items-center gap-2">
                  <p>7d%</p>
                  <FilterArrow filter={filter} forFilter="change" />
                </div>
              </th>
              <th
                onClick={() => changeFilter("marketCap")}
                className="text-left p-4  items-center gap-3 select-none cursor-pointer "
              >
                <div className="relative flex items-center gap-2">
                  <p>Market Cap</p>
                  <FilterArrow filter={filter} forFilter="marketCap" />
                </div>
              </th>
              <th
                onClick={() => changeFilter("24hVolume")}
                className="text-left p-4  items-center gap-3 select-none cursor-pointer "
              >
                <div className="relative flex items-center gap-2">
                  <p>24H Volume</p>
                  <FilterArrow filter={filter} forFilter="24hVolume" />
                </div>
              </th>
              <th className="text-left p-4"> Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {_coins
              .sort((a, b) => {
                if (filter.orderDirection == "desc") {
                  return Number(b[filter.orderBy]) - Number(a[filter.orderBy]);
                }
                return Number(a[filter.orderBy]) - Number(b[filter.orderBy]);
              })
              .map((coin) => {
                return (
                  <tr key={coin.uuid} className="text-left hover:bg-black/40">
                    <td className="p-4 border-b border-slate-700  ">
                      <p className="text-left">{coin.rank}</p>
                    </td>
                    <td className="p-4 border-b border-slate-700 ">
                      <Link shallow={false} href={`/coin/${coin.uuid}`}>
                        <a className="flex items-center gap-4">
                          <Image
                            alt={`${coin.name}`}
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
      ) : (
        <TableTemplate />
      )}
      <br />
      {_coins.length > 0 && (
        <p className="text-sm">
          Showing {currentPage * limit - (limit - 1)} -{" "}
          {stats?.total && currentPage * limit + (_coins.length - limit)} out of{" "}
          {stats?.total}
        </p>
      )}
      {_coins.length > 0 && (
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
                  n === currentPage && "bg-primary-600 text-black font-bold"
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

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div className="w-full pt-10 h-screen overflow-x-auto flex flex-col items-center gap-10  text-white bg-black/20 backdrop-blur-sm px-4 xl:px-40">
      <p className="text-3xl font-bold">End of the charts</p>
      <button
        onClick={() => router.push("/")}
        className="bg-primary-500 text-black p-2 rounded-md"
      >
        Go to homepage
      </button>
    </div>
  );
};

const TableTemplate = () => {
  let rows = 6;
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full h-8 rounded-md animate-pulse bg-gray-700"></div>
      {[...Array(rows)].map((e, i) => (
        <div
          key={i}
          className="w-full h-8 rounded-md animate-pulse bg-gray-800"
        ></div>
      ))}
    </div>
  );
};

const FilterArrow: React.FunctionComponent<{
  filter: Filter;
  forFilter: OrderBy;
}> = ({ filter, forFilter }) => {
  if (forFilter === filter.orderBy) {
    return (
      <div className="">
        <Triangle
          direction={filter.orderDirection == "desc" ? "bottom" : "top"}
          w={8}
          h={6}
          color="fill-white"
        />
      </div>
    );
  }
  return null;
};
