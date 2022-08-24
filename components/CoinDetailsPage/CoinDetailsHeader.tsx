import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "../../hooks";
import { DetailedCoin } from "../../remote_api/CoinRanking";

export const CoinDetailsHeader: React.FunctionComponent<{
  coin: DetailedCoin;
  loading: boolean;
}> = ({ coin, loading }) => {
  const { currency, formatPrice, getTrend, formatNumber } = useCurrency();

  return (
    <div
      className={`flex flex-col md:flex-row justify-between gap-10 md:gap-40 w-full`}
    >
      {/* Coin Info */}
      <div className="flex flex-col items-start gap-3  md:w-1/3">
        {/*Coin name and icon  */}
        <div className="flex gap-3 items-center">
          <Image
            alt={`${coin?.name}`}
            className=""
            objectFit="contain"
            height={30}
            width={30}
            src={coin.iconUrl?.split("?")[0] || "/"}
          />
          <p className="text-white font-bold text-2xl">{coin.name}</p>
          <p className="bg-gray-700 text-gray-400 text-xs font-bold  p-1 rounded-md">
            {coin.symbol}
          </p>
        </div>

        {/* Coin rank */}
        <p className=" text-xs font-medium text-black bg-primary-500 p-1 rounded-md">
          Rank #{coin.rank}
        </p>
        {/* Coin links */}
        <div className="mt-5 md:flex gap-2 flex-wrap hidden">
          {coin.links?.map((e, i) => {
            return <Chip key={`${e.url + i}`} text={e.name} link={e.url} />;
          })}
        </div>
      </div>
      {/* Coin Price */}
      <div className="flex flex-col  gap-2  md:items-end lg:items-start md:w-2/3">
        <p className="text-sm text-slate-400">{coin.name} Price </p>
        <div className="flex gap-4 items-center justify-between md:justify-start">
          {/*  Loader */}
          {/* {loading === true && (
            <div className="flex items-center justify-center ">
              <div className="w-4 h-4 border-b-2 border-gray-100 rounded-full animate-spin"></div>
            </div>
          )}  */}

          <p
            className={` text-white font-bold text-3xl ${
              loading && "animate-pulse"
            }`}
          >
            {formatPrice(coin.price)}{" "}
          </p>

          <p
            className={`${
              getTrend(coin.change) === "up" ? "bg-green-500" : "bg-red-500"
            }
          pl-2 pr-2 text-sm  font-medium pt-1 pb-1 rounded-md text-white`}
          >
            {coin.change} %
          </p>
        </div>
        <p className="text-sm text-slate-400">{coin.btcPrice} BTC </p>
        <br />

        {/* Coin Supply */}
        <div className="flex flex-wrap  flex-row gap-5 md:gap-10 md:items-start md:justify-end lg:items-start ">
          <div>
            <p className="text-sm text-slate-400">Market Cap </p>
            <p className="text-sm text-neutral-100 font-bold">
              {formatPrice(coin.marketCap)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">24H Volume</p>
            <p className="text-sm text-neutral-100 font-bold">
              {formatPrice(coin["24hVolume"])}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Circulating Supply</p>
            <p className="text-sm text-neutral-100 font-bold">
              {`${formatNumber(coin.supply.circulating)}
              ${coin.symbol}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chip: React.FunctionComponent<{ text: string; link?: string }> = ({
  text,
  link,
}) => {
  if (link)
    return (
      <Link href={link}>
        <a
          target={"_blank"}
          className="hover:bg-gray-300 hover:text-gray-600 bg-gray-700 text-gray-400 text-xs  pt-1 pb-1 pl-2 pr-2 rounded-md"
        >
          {text}
        </a>
      </Link>
    );
  return (
    <p className=" bg-gray-700 text-gray-400 text-xs  pt-1 pb-1 pl-2 pr-2 rounded-md">
      {text}
    </p>
  );
};
