import { DetailedCoin } from "../../../remote_api/CoinRanking";
import { CoinDetailsHeader } from "../../CoinDetailsPage";
import { CoinPriceChart } from "../../Charts/CoinPriceChart";
import { useCoin } from "../../../hooks";
import { ExchangesList } from "../../CoinDetailsPage/ExchangesList";
const parse = require("html-react-parser");
interface ICoinDetailsPage {
  coin: DetailedCoin;
}

const CoinDetailsPage: React.FunctionComponent<ICoinDetailsPage> = ({
  coin,
}) => {
  const { coinData, loading } = useCoin(coin.uuid, coin);

  return (
    <div className="flex flex-col gap-20 h-max w-full  bg-cover  bg-gradient-to-t from-black/50 via-gray-800/70 to-gray-800/50 md:px-5 px-2 xl:px-60 py-20 ">
      <CoinDetailsHeader coin={coinData} loading={loading} />
      <div className="flex flex-col items-start md:items-center gap-10">
        <div className="flex flex-col md:flex-row w-full gap-5 ">
          <div className="w-full md:w-2/3 flex self-start ">
            <CoinPriceChart coin={coinData} />
          </div>
          <div className=" md:w-1/3 bg-gray-900/30  rounded-md h-[36rem] p-4  overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <ExchangesList coin={coinData} uuid={coin.uuid} />
          </div>
        </div>

        {/* Coin Information */}
        <br />
        {coinData?.description && (
          <article className="prose prose-slate max-w-full w-full prose-invert  prose-p:text-neutral-300 prose-a:text-primary-300 prose-h3:text-slate-400 prose-h2:text-slate-400 prose-h1:text-slate-400">
            <h2>About {coin.name}</h2>
            {parse(coinData?.description)}
          </article>
        )}
      </div>
    </div>
  );
};

export default CoinDetailsPage;
