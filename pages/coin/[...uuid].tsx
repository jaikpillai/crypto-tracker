import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import {
  CoinRankingAPI,
  DetailedCoin,
  INR_CURRENCY,
} from "../../remote_api/CoinRanking";
import backendAxiosInstance from "../../remote_api/CoinRanking/CoinRanking";

interface ICoinPage {
  coin: DetailedCoin;
}

const CoinPage: NextPage<ICoinPage> = ({ coin }) => {
  return <div>{coin.name}</div>;
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
  let currency = INR_CURRENCY;
  let result = await backendAxiosInstance({
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API || "",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
    url: coinAPI.coinDetailsQuery(uuid).url,
    params: coinAPI.coinDetailsQuery(uuid, {
      referenceCurrencyUuid: currency.uuid,
    }).params,
  });

  let coin = result.data.data.coin;

  return { props: { coin } };
};

export default CoinPage;
