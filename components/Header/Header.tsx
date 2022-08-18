import { useEffect, useState } from "react";
import { useCurrency } from "../../hooks/useCurrency";
import { useTop5Coins } from "../../hooks/";
import { Coin } from "../../remote_api/CoinRanking";
import { CoinCard } from "../Cards/CoinCard";

interface IHeader {
  headingText: string;
  subHeading?: string;
  callToAction?: { text: string; link: string };
  top5Coins: Coin[];
}

export const Header: React.FunctionComponent<IHeader> = ({
  headingText,
  subHeading,
  callToAction,
  top5Coins,
}) => {
  // const { top5Coins } = useTop5Coins();
  // const { currency } = useCurrency();

  // useEffect(() => {
  //   fetchTop5Coins();
  // }, [currency]);

  return (
    <div className=" pt-20 pb-20 shadow-md flex flex-col items-center justify-center w-full min-h-[20rem]  p-4 gap-4">
      <h1 className="text-2xl lg:text-4xl font-bold text-white">
        {headingText}
      </h1>
      <h2 className="text lg:text-xl text-neutral-300">{subHeading}</h2>
      <br />
      {/* Top 5 Coins List */}
      <div className="flex gap-3 flex-wrap items-center justify-center">
        {top5Coins?.map((coin) => {
          return <CoinCard key={coin.uuid} coin={coin} />;
        })}
      </div>
    </div>
  );
};
