import { NextPage } from "next";
import { CoinRankingCharts } from "../../components/views/Homepage/CoinRankingCharts";
import { Coin } from "../../remote_api/CoinRanking";

const ChartsPage: NextPage<{ coins: Coin[] }> = (props) => {
  return <CoinRankingCharts coins={props.coins} />;
};

export default ChartsPage;
