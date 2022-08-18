import { DetailedCoin } from "../../../remote_api/CoinRanking";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useCoinHistoricalData } from "../../../hooks/useCoinHistoricalData";
import { useState } from "react";

interface ICoinDetailsPage {
  coin: DetailedCoin;
}

export const CoinDetailsPage: React.FunctionComponent<ICoinDetailsPage> = ({
  coin,
}) => {
  Chart.register(CategoryScale);

  const { historicalData, timePeriod } = useCoinHistoricalData(coin.uuid);
  return (
    <div>
      <Line
        datasetIdKey={"lineChart"}
        data={{
          labels: historicalData
            ?.sort((a, b) => a.timestamp - b.timestamp)
            .map((hs) => {
              let date = new Date(hs.timestamp * 1000);

              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return timePeriod === "1h" ||
                timePeriod === "3h" ||
                timePeriod === "12h" ||
                timePeriod === "24h"
                ? time
                : date.toLocaleDateString();
            }),
          datasets: [
            {
              data: historicalData
                ?.sort((a, b) => a.timestamp - b.timestamp)
                .map((hs) => Number(hs.price)),
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
        style={{}}
      />
    </div>
  );
};
