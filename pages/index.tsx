import { NextPage } from "next";
import { Homepage } from "../components/views/Homepage/Homepage";
import backendAxiosInstance, {
  Coin,
  CoinRankingAPI,
  INR_CURRENCY,
  US_DOLLAR_CURRENCY,
} from "../remote_api/CoinRanking";

const Home: NextPage<{ coins: Coin[]; top5Coins: Coin[] }> = (props) => {
  return <Homepage coins={props.coins} top5Coins={props.top5Coins} />;
};

export default Home;

export const getServerSideProps = async () => {
  let coinAPI = new CoinRankingAPI();
  let currency = US_DOLLAR_CURRENCY;

  // all coins
  let resultAllCoins = await backendAxiosInstance({
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API || "",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
    url: coinAPI.allCoinsQuery().url,
    params: coinAPI.allCoinsQuery({
      referenceCurrencyUuid: currency.uuid,
    }).params,
  });

  let coins = resultAllCoins.data.data.coins;
  let top5Coins = resultAllCoins.data.data.coins.slice(0, 5);
  
  return {
    props: { coins: coins, top5Coins: top5Coins },
  };
};
