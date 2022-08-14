import type { NextPage } from "next";
import useCoinsList from "../hooks/useCoinsList";
import {
  Sparklines,
  SparklinesLine,
  SparklinesNormalBand,
} from "react-sparklines";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCoin } from "../hooks/useCoin";

const Home: NextPage = () => {
  let [query, setQuery] = useState({});
  let inpRef = useRef<HTMLInputElement>(null);
  let { coins } = useCoinsList(query);
  // let { coinData } = useCoin("Qwsogvtv82FCd");

  const handleChange = () => {
    setQuery((prev) => {
      return { ...prev, search: inpRef.current?.value };
    });
  };

  return (
    <>
      <div style={{ display: "contents", overflowY: "scroll" }}>
        {coins?.map((e) => {
          return (
            <div key={e.uuid} style={{ display: "flex" }}>
              <Image
                objectFit="contain"
                height={10}
                width={10}
                src={e.iconUrl.split("?")[0]}
              />
              <span>{e.name}</span>
              <span>{e.marketCap}</span>
              <div style={{ height: "10px", width: "60px" }}>
                <Sparklines data={e.sparkline.map((e) => Number(e))}>
                  <SparklinesLine
                    color={Number(e.change) > 0 ? "green" : "red"}
                  />
                </Sparklines>
              </div>
            </div>
          );
        })}
        <input ref={inpRef} onChange={(e) => handleChange()} />
      </div>
    </>
  );
};

export default Home;
