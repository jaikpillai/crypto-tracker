import { DetailedCoin } from "../../../remote_api/CoinRanking";
import { CoinDetailsHeader } from "../../CoinDetailsPage";
import { CoinPriceChart } from "../../Charts/CoinPriceChart";
import { useCoin } from "../../../hooks";
import { ExchangesList } from "../../CoinDetailsPage/ExchangesList";
const parse = require("html-react-parser");
interface ICoinDetailsPage {
  coin: DetailedCoin;
}

export const CoinDetailsPage: React.FunctionComponent<ICoinDetailsPage> = ({
  coin,
}) => {
  const { coinData } = useCoin(coin.uuid, coin);
  return (
    <div className="flex flex-col gap-20 h-screen bg-neutral-800 bg-gradient-to-t from-black via-gray-800 to-gray-800 overflow-y-auto px-2 xl:px-60 py-10 lg:py-20">
      <CoinDetailsHeader coin={coinData} />

      <div className="flex flex-col items-start md:items-center gap-10">
        <div className="flex flex-col md:flex-row w-full gap-5 ">
          <div className="w-full md:w-2/3 flex self-start ">
            <CoinPriceChart coin={coinData} />
          </div>
          <div className=" md:w-1/3 bg-gray-900/30  rounded-md h-[36rem] p-4  overflow-y-auto">
            <ExchangesList coin={coinData} uuid={coin.uuid} />
          </div>
        </div>

        {/* Coin Information */}
        <br />
        <article className="prose prose-slate max-w-full prose-invert  prose-p:text-neutral-300 prose-a:text-primary-300 prose-h3:text-slate-400 prose-h2:text-slate-400 prose-h1:text-slate-400">
          <h2>About {coin.name}</h2>
          {parse(coinData.description)}
        </article>
      </div>
    </div>
  );
};
