import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "../../hooks";
import { useExchangeList } from "../../hooks/useExchangeList";
import { DetailedCoin, Exchange } from "../../remote_api/CoinRanking";

interface IExchangeList {
  uuid: string;
  coin: DetailedCoin;
}
export const ExchangesList: React.FunctionComponent<IExchangeList> = ({
  uuid,
  coin,
}) => {
  const { exchanges, loading } = useExchangeList(uuid);
  return (
    <div className="relative flex flex-col gap-4 mt-5 scrollbar ">
      <p className="text-neutral-200 text-lg font-bold  ">Listed On</p>

      {exchanges?.map((e) => {
        return <ExchangeCard coin={coin} key={e.uuid} exchange={e} />;
      })}

      {exchanges.length === 0 && loading === false && (
        <p className="text-neutral-200">No Exchanges found</p>
      )}
    </div>
  );
};

interface IExchangeCard {
  exchange: Exchange;
  coin: DetailedCoin;
}

const ExchangeCard: React.FunctionComponent<IExchangeCard> = ({
  exchange,
  coin,
}) => {
  const { formatPrice } = useCurrency();

  return (
    <Link href={exchange.coinrankingUrl}>
      <a
        target={"_blank"}
        className=" flex p-4 gap-2 rounded-md w-full transition-all duration-200 hover:bg-black/40"
      >
        <p className="text-neutral-200 text-sm font-medium mr-2 ">
          {exchange.rank}
        </p>
        <Image
          alt={`${exchange?.name}`}
          className=""
          objectFit="contain"
          height={20}
          width={20}
          src={exchange.iconUrl?.split("?")[0] || "/"}
        />
        <p className="text-neutral-200  font-medium">{exchange.name}</p>
        {exchange.verified === true && (
          <p className="text-xs text-blue-400">Verified</p>
        )}
        <p
          className={`text-sm font-medium flex-1 text-end ${
            Number(coin.price) >= Number(exchange.price) &&
            exchange.price !== null
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {exchange.price != null && formatPrice(exchange.price)}
        </p>
      </a>
    </Link>
  );
};
