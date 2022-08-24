import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import CoinDetailsPage from "../../components/views";
import CoinRankingAPI, {
  DetailedCoin,
  getDefaultCurrency,
} from "../../remote_api/CoinRanking";

interface ICoinPage {
  coin: DetailedCoin;
}

const CoinPage: NextPage<ICoinPage> = ({ coin }) => {
  return (
    <>
      <Head>
        <title>{coin.name}</title>
      </Head>
      <CoinDetailsPage coin={coin} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const uuid = Array.isArray(query.uuid)
    ? query.uuid[0]
    : query.uuid
    ? query.uuid
    : "";

  let currency;

  try {
    currency = JSON.parse(JSON.parse(JSON.stringify(req.cookies["currency"])))
      ?.uuid
      ? JSON.parse(JSON.parse(JSON.stringify(req.cookies["currency"])))
      : getDefaultCurrency();
  } catch (e) {
    currency = getDefaultCurrency();
  }

  let result = await new CoinRankingAPI()
    .getCoinDetails(uuid, {
      referenceCurrencyUuid: currency?.uuid,
      timePeriod: "1h",
    })
    .fetch();

  let coin = result.data.data.coin;

  return { props: { coin } };
};

export default CoinPage;
