import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, ScriptableContext } from "chart.js";
import { Coin } from "../../remote_api/CoinRanking";
import { useCurrency } from "../../hooks";
import {
  TimePeriod,
  useCoinHistoricalData,
} from "../../hooks/useCoinHistoricalData";
import { useEffect, useState } from "react";
import { _DeepPartialObject } from "chart.js/types/utils";

export const CoinPriceChart: React.FunctionComponent<{ coin: Coin }> = ({
  coin,
}) => {
  const { historicalData, timePeriod, setTimePeriod, change, loading } =
    useCoinHistoricalData(coin.uuid);
  const { getTrend, formatPrice } = useCurrency();
  const [zoomLib, setZoomLib] = useState<any>();
  const { currency } = useCurrency();

  const _timePeriods: TimePeriod[] = [
    "1h",
    "3h",
    "12h",
    "24h",
    "7d",
    "30d",
    "3m",
    "1y",
    "3y",
    "5y",
  ];

  const getGradient = (_ctx: ScriptableContext<"line">) => {
    const ctx = _ctx.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, _ctx.chart.height - 60);
    switch (getTrend(change)) {
      case "up":
        gradient.addColorStop(0, "rgba(34,197,94,0.6)");
        gradient.addColorStop(0.2, "rgba(34,197,94,0.5)");
        gradient.addColorStop(1, "rgba(34,197,94,0)");
        break;
      case "down":
        gradient.addColorStop(0, "rgba(239,68,68,0.6)");
        gradient.addColorStop(0.2, "rgba(239,68,68,0.5)");
        gradient.addColorStop(1, "rgba(239,68,68,0)");
        break;
    }

    return gradient;
  };

  useEffect(() => {
    Chart.register(CategoryScale, {
      id: "lineChart", //typescript crashes without id
      afterDraw: function (chart: any, easing: any) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
          const activePoint = chart.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.element.x;
          const y = activePoint.element.y;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;
          const leftX = chart.scales.x.left;
          const RightX = chart.scales.x.right;
          if (ctx.setLineDash !== undefined) {
            ctx.setLineDash([2, 5]);
          }
          if (ctx.mozDash !== undefined) {
            ctx.mozDash = [2, 5];
          }
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = "1";
          ctx.strokeStyle = "rgba(212, 212, 212, 0.91)";
          ctx.stroke();
          ctx.restore();

          ctx.beginPath();
          ctx.moveTo(leftX, y);
          ctx.lineTo(RightX, y);
          ctx.lineWidth = "1";
          ctx.strokeStyle = "rgba(212, 212, 212, 0.91)";
          ctx.stroke();
          ctx.restore();
        }
      },
    });
    const importZoom = async () => {
      let zoomLib = (await import("chartjs-plugin-zoom")).default;
      setZoomLib(zoomLib);
    };
    importZoom();
  }, []);

  useEffect(() => {
    if (zoomLib) {
      Chart.register(zoomLib, {
        id: "lineChart",
      });
    }
  }, [zoomLib]);

  return (
    <div className="w-full relative flex flex-col ">
      {loading === true && (
        <>
          <div className="absolute inset-0 backdrop-blur-sm flex flex-col gap-2 items-center  justify-center">
            <div className="flex items-center justify-center ">
              <div className="w-8 h-8 border-b-2 border-gray-100 rounded-full animate-spin"></div>
            </div>
            <p className="text-sx font-medium text-gray-100">Loading Data</p>
          </div>
        </>
      )}
      <p className="text-white font-bold mb-5 text-lg">
        {coin.name} to {currency?.symbol} Chart
      </p>

      {/* Time Period Buttons */}
      <div className="relative min-w-full md:min-w-fit bg-gray-700  inline-flex gap-2 pl-1 pr-1 md:pl-2 md:pr-2 pt-1 pb-1 self-end  rounded-lg justify-between">
        {_timePeriods.map((t, i) => {
          return (
            <button
              key={i}
              className={`hover:bg-gray-800 pt-1 pb-1 md:pr-2 md:pl-2 pl-1 pr-1 rounded-md text-gray-400 text-xs md:text-sm ${
                timePeriod === t && "bg-gray-800"
              }`}
              onClick={() => setTimePeriod(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
      <br />

      <div className="  ">
        <Line
          datasetIdKey={"lineChart"}
          color={"blue"}
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

                backgroundColor: (_ctx: ScriptableContext<"line">) => {
                  return getGradient(_ctx);
                },
                fill: true,
                borderColor: getTrend(change) === "up" ? "#22c55e" : "#ef4444",
                borderWidth: (_ctx: ScriptableContext<"line">) => {
                  const ctx = _ctx.chart.ctx;
                  const stroke = (ctx.lineWidth = 1);
                  return stroke;
                },
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: false,
                  color: "rgba(63, 63, 70, 0.4)",
                },
              },
              y: {
                ticks: {
                  color: "#737373",
                },
                grid: {
                  color: "rgba(63, 63, 70, 0.4)",
                },
              },
            },
            interaction: {
              mode: "index",
              intersect: false,
            },
            animation: {
              duration: 500,
              easing: "easeOutCubic",
            },

            plugins: {
              legend: {
                display: false,
              },
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },

                  mode: "x",
                },
                pan: {
                  enabled: true,
                  mode: "x",
                },
              },
              tooltip: {
                yAlign: "bottom",
                callbacks: {
                  label: function (e) {
                    return formatPrice(String(e.raw)).toString();
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
