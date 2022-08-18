import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrency } from "../../hooks/useCurrency";
import { Coin } from "../../remote_api/CoinRanking";

export const CoinCard: React.FunctionComponent<{
  coin: Coin;
}> = (props) => {
  const { formatPrice, getTrend, currency } = useCurrency();

  return (
    <>
      <button className="rounded-lg bg-neutral-900 h-20 md:h-40 w-[12rem] p-4 justify-between flex flex-col transition-colors duration-100 group shadow-md hover:bg-primary-600">
        {/* Card Top  */}
        <div className="hidden md:flex w-full justify-between items-center">
          <span className="text-neutral-500 group-hover:text-neutral-300">
            {props.coin.symbol}
          </span>
          {/* Coin Image */}
          <div className="h-12 w-12 p-1">
            <Image
              className=""
              objectFit="contain"
              height={50}
              width={50}
              src={props.coin.iconUrl?.split("?")[0] || "/"}
            />
          </div>
        </div>

        {/* Coin Name & Price */}

        <div className="flex flex-col w-full justify-between items-start">
          <p className="w-full text-lg text-left font-medium text-neutral-100 truncate group-hover:text-neutral-100">
            {props.coin.name}
          </p>

          {/* Price */}

          <div className="flex w-full justify-between">
            <span
              className={`w-full text-start truncate ${
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
