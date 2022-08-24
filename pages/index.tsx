import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Homepage } from "../components/views/Homepage/Homepage";
import CoinRankingAPI, {
  Coin,
  CoinsStats,
  getDefaultCurrency,
} from "../remote_api/CoinRanking";

const Home: NextPage<{
  coins: Coin[];
  top5Coins: Coin[];
  stats: CoinsStats;
}> = (props) => {
  return (
    <>
      <Homepage
        stats={props.stats}
        coins={props.coins}
        top5Coins={props.top5Coins}
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let coinAPI = new CoinRankingAPI();

  let currency;

  try {
    currency = JSON.parse(JSON.parse(JSON.stringify(req.cookies["currency"])))
      ?.uuid
      ? JSON.parse(JSON.parse(JSON.stringify(req.cookies["currency"])))
      : getDefaultCurrency();
  } catch (e) {
    currency = getDefaultCurrency();
  }

  // all coins
  let results = await coinAPI.getAllCoins().fetch();

  let coins = results.data.data.coins;
  let stats = results.data.data.stats;
  let top5Coins = results.data.data.coins.slice(0, 5);

  return {
    props: { coins: coins, top5Coins: top5Coins, stats: stats },
  };
};
