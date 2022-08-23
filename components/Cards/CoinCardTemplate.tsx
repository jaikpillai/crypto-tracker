import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrency } from "../../hooks/useCurrency";
import { Coin } from "../../remote_api/CoinRanking";

export const CoinCardTemplate: React.FunctionComponent<{
  coin?: Coin;
  onClick?: () => {};
}> = (props) => {
  const { formatPrice, getTrend, currency } = useCurrency();

  return (
    <>
      <div className="justify-center rounded-lg overflow-hidden animate-pulse bg-gray-400/20 backdrop-blur-lg h-16 md:h-40 w-[8rem] md:w-[12rem] p-4 md:justify-between flex flex-col transition-colors duration-100 group shadow-md ">
        {/* Card Top  */}
        <div className="relative  hidden md:flex w-full justify-between items-center">
          <span className=" bg-neutral-500 animate-pulse h-6 w-12 rounded-md group-hover:text-neutral-300"></span>
        </div>

        {/* Coin Name & Price */}

        <div className=" z-10 flex flex-col w-full justify-between items-start gap-2">
          <p className="w-full text-sm md:text-lg text-left bg-neutral-500 rounded-md mr-6 h-6  animate-pulse  font-medium text-neutral-100 truncate group-hover:text-neutral-100">
            {props.coin?.name}
          </p>

          {/* Price */}

          <div className="flex w-full justify-between  items-center">
            <span
              className={`w-full bg-neutral-500 rounded-md mr-6 h-6  animate-pulse text-xs md:text-lg text-start truncate`}
            ></span>
            <span
              className={` bg-neutral-500 rounded-md  h-6 animate-pulse text-xs md:text-lg text-start truncate`}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};
