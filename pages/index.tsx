import type { NextPage } from "next";
import useCoinsList from "../hooks/useCoinsList";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";

const Home: NextPage = () => {
  let lol = useCoinsList();

  return <></>;
};

export default Home;
