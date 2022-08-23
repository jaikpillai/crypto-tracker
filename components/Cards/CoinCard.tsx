import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrency } from "../../hooks/useCurrency";
import { Coin } from "../../remote_api/CoinRanking";

export const CoinCard: React.FunctionComponent<{
  coin: Coin;
  onClick?: () => {};
}> = (props) => {
  const { formatPrice, getTrend, currency } = useCurrency();

  return (
    <>
      <button
        onClick={() => props.onClick && props.onClick()}
        className="justify-center rounded-lg overflow-hidden bg-gray-400/20 backdrop-blur-lg h-16 md:h-40 w-[8rem] md:w-[12rem] p-4 md:justify-between flex flex-col transition-colors duration-100 group shadow-md hover:bg-primary-600"
      >
        {/* Card Top  */}
        <div className="relative  hidden md:flex w-full justify-between items-center">
          <span className=" text-neutral-500 group-hover:text-neutral-300">
            {props.coin.symbol}
          </span>
          {/* Coin Image */}
          <div className="-z-0 transition-all group-hover:top-4 group-hover:scale-125 absolute top-0 left-4 h-60 w-60 p-1">
            <Image
              alt={`${props.coin?.name}`}
              className="grayscale opacity-10 group-hover:opacity-20"
              objectFit="contain"
              height={150}
              width={150}
              src={props.coin.iconUrl?.split("?")[0] || "/"}
            />
          </div>
        </div>

        {/* Coin Name & Price */}

        <div className=" z-10 flex flex-col w-full justify-between items-start ">
          <p className="w-full text-sm md:text-lg text-left font-medium text-neutral-100 truncate group-hover:text-neutral-100">
            {props.coin.name}
          </p>

          {/* Price */}

          <div className="flex w-full justify-between  items-center">
            <span
              className={`w-full text-xs md:text-lg text-start truncate ${
                getTrend(props.coin.change) === "up"
                  ? "text-green-500 group-hover:text-neutral-100"
                  : "text-red-500 group-hover:text-neutral-100"
              }`}
            >
              {formatPrice(props.coin.price)}
            </span>
            {getTrend(props.coin.change) === "up" ? (
              <TrenUpIcon />
            ) : (
              <TrenDownIcon />
            )}
          </div>
        </div>
      </button>
    </>
  );
};

const TrenUpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-green-500 group-hover:stroke-neutral-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
};

const TrenDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-red-500 group-hover:stroke-neutral-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>
  );
};
