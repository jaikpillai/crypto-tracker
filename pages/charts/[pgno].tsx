import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Charts } from "../../components/views/Homepage/ChartsPage";
import { Coin } from "../../remote_api/CoinRanking";

const ChartsPage: NextPage<{ coins: Coin[]; top5Coins: Coin[] }> = (props) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (Number(router.query.pgno) > 0) {
      setPageNumber(Math.abs(Number(router.query.pgno)));
    }
  }, [router]);

  return (
    // TODO
    // Add page number validation
    <Charts
      coins={props.coins}
      top5Coins={props.top5Coins}
      pageNumber={pageNumber}
    />
  );
};

export default ChartsPage;
