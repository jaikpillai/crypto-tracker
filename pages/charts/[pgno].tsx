import { NextPage } from "next";
import Head from "next/head";
import { CoinRankingCharts } from "../../components/views/Homepage/CoinRankingCharts";
import { Coin } from "../../remote_api/CoinRanking";

const ChartsPage: NextPage<{ coins: Coin[] }> = (props) => {
  return (
    <>
      <Head>
        <title>CryptoBoo | Charts</title>
      </Head>
      <CoinRankingCharts coins={props.coins} />
    </>
  );
};

export default ChartsPage;
