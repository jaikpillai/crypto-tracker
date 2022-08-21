import { GetServerSideProps, NextPage } from "next";
import { CoinDetailsPage } from "../../components/views";
import {
  CoinRankingAPI,
  DetailedCoin,
  getDefaultCurrency,
  INR_CURRENCY,
  US_DOLLAR_CURRENCY,
} from "../../remote_api/CoinRanking";
import backendAxiosInstance, {
  axiosPublic,
} from "../../remote_api/CoinRanking/CoinRanking";

interface ICoinPage {
  coin: DetailedCoin;
}

const CoinPage: NextPage<ICoinPage> = ({ coin }) => {
  return <CoinDetailsPage coin={coin} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const uuid = Array.isArray(query.uuid)
    ? query.uuid[0]
    : query.uuid
    ? query.uuid
    : "";
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
  let result = await axiosPublic({
    url: coinAPI.coinDetailsQuery(uuid).url,
    params: coinAPI.coinDetailsQuery(uuid, {
      referenceCurrencyUuid: currency?.uuid,
      timePeriod: "1h",
    }).params,
  });
  // let result = await backendAxiosInstance({
  //   headers: {
  //     "X-RapidAPI-Key": process.env.RAPID_API || "",
  //     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  //   },
  //   url: coinAPI.coinDetailsQuery(uuid).url,
  //   params: coinAPI.coinDetailsQuery(uuid, {
  //     referenceCurrencyUuid: currency.uuid,
  //     timePeriod: "1h",
  //   }).params,
  // });

  let coin = result.data.data.coin;

  return { props: { coin } };
};

export default CoinPage;
