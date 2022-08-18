import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";
import { useCurrency } from "../../hooks/useCurrency";
import { Coin } from "../../remote_api/CoinRanking";

interface IRow {
  coin: Coin;
}

export const Row: React.FunctionComponent<IRow> = ({ coin }) => {
  const { formatPrice, getTrend } = useCurrency();
  return (
    <div className="grid grid-cols-5  auto-cols-max gap-4">
      {/* Name */}
      <p>{coin.name}</p>
      {/* Price */}
      <p>{formatPrice(coin.price)}</p>
      <p>{formatPrice(coin.marketCap)}</p>
      <p>{formatPrice(coin["24hVolume"])}</p>
      <div className="w-32 h-full">
        <Sparklines limit={15} data={coin.sparkline.map((e) => Number(e))}>
          <SparklinesLine
            color={getTrend(coin.change) === "up" ? "green" : "red"}
          />
        </Sparklines>
      </div>
      {/* <p>{formatPrice(coin.sparkline)}</p> */}
    </div>
  );
};
