import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

export const LineChart = () => {
  Chart.register(CategoryScale);
  return (
    <Line
      datasetIdKey={"lineChart"}
      width={100}
      height={100}
      data={{
        labels: [
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "dsf",
          "sdf",
          "sdf",
          "sdf",
          "sdf",
          "sdf",
          "sdf",
        ],
        datasets: [
          {
            data: [5, 6, 7, 5, 3, 2, 44, 34, 3, 2454, 6],
          },
        ],
      }}
    />
  );
};
