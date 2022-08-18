import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";
import { useCoinsList, useCurrency } from "../../hooks";
import { Coin } from "../../remote_api/CoinRanking";
import { Triangle } from "../Shapes";

interface IChoinChart {
  coins: Coin[];
}

export const CoinChart: React.FunctionComponent<IChoinChart> = ({
  coins: _coins,
}) => {
  const { formatPrice, getTrend, currency } = useCurrency();

  return (
    <div className="pt-10 min-h-screen overflow-x-auto flex items-start justify-start lg:justify-center text-white bg-black/20 backdrop-blur-sm lg:px-40">
      <table className="border-collapse table-auto w-full text-start">
        <thead className="border-b-2 border-slate-700">
          <tr>
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">Name</th>
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
                  <p>{formatPrice(coin.price)}</p>
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
    </div>
  );
};
