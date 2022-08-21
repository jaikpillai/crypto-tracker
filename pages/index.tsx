import { GetServerSideProps, NextPage } from "next";
import { Homepage } from "../components/views/Homepage/Homepage";
import backendAxiosInstance, {
  Coin,
  CoinRankingAPI,
  getDefaultCurrency,
} from "../remote_api/CoinRanking";
import { axiosPublic } from "../remote_api/CoinRanking/CoinRanking";

const Home: NextPage<{ coins: Coin[]; top5Coins: Coin[] }> = (props) => {
  return <Homepage coins={props.coins} top5Coins={props.top5Coins} />;
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
  let resultAllCoins = await axiosPublic({
    url: coinAPI.allCoinsQuery().url,
    params: coinAPI.allCoinsQuery({
      referenceCurrencyUuid: currency?.uuid,
    }).params,
  });

  let coins = resultAllCoins.data.data.coins;
  let top5Coins = resultAllCoins.data.data.coins.slice(0, 5);

  return {
    props: { coins: coins, top5Coins: top5Coins },
  };
};
