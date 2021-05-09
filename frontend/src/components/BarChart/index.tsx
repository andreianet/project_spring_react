import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "util/format";
import { BASE_URL } from "util/request";

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  labels: {
    categories: string[];
  };
  series: SeriesData[];
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: { categories: [] },
    series: [{ name: "", data: [] }],
  });

  useEffect(() => {
    (async function graphGenerator() {
      const response = await axios.get(BASE_URL + "/sales/success-by-seller");
      const data = response.data as SaleSuccess[];
      const labels = data.map((x) => x.sellerName);
      const series = data.map((x) =>
        round((x.deals / x.visited) * 100, 1)
      );

      setChartData({
        labels: {
          categories: labels,
        },
        series: [{ name: "% Success", data: series }],
      });
    })();
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
};

export default BarChart;