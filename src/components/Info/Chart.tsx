import axios from "axios";
import { randomInt } from "d3";
import { useEffect, useState } from "react";
import { HistoricalGlobal } from "../../types";
import { ChartData } from "../../types";
import LineChart from "./LineChart";
import VictoryLineChart from "./VictoryLineChart";
import "./Chart.scss";

const Chart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [casesData, setCasesData] = useState<ChartData[]>([]);
  const [deathsData, setDeathsData] = useState<ChartData[]>([]);
  const [recoveredData, setRecoveredData] = useState<ChartData[]>([]);

  useEffect(() => {
    const getHistoric = async (country: string | null) => {
      try {
        if (country == null) {
          const response = await axios.get(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=7"
          );

          const historicAll: HistoricalGlobal = response.data;

          let data: ChartData[] = [];
          for (const [key, value] of Object.entries(historicAll.cases)) {
            data.push({
              date: key.substring(0, key.lastIndexOf("/")),
              value: Number(value),
              symbol: "circle",
              fill: "#fff",
            });
          }
          setCasesData(data);
          data = [];

          for (const [key, value] of Object.entries(historicAll.deaths)) {
            data.push({
              date: key.substring(0, key.lastIndexOf("/")),
              value: Number(value),
              symbol: "circle",
              fill: "#fff",
            });
          }
          setDeathsData(data);
          data = [];

          for (const [key, value] of Object.entries(historicAll.recovered)) {
            data.push({
              date: key.substring(0, key.lastIndexOf("/")),
              value: Number(value),
              symbol: "circle",
              fill: "#fff",
            });
          }
          setRecoveredData(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getHistoric(null);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="charts">
        {/* <LineChart width={500} height={500} data={chartData} /> */}
        <div className="chart">
          <VictoryLineChart data={casesData} name="Cases" />
        </div>
        <div className="chart">
          <VictoryLineChart data={deathsData} name="Deaths" />
        </div>
        <div className="chart">
          <VictoryLineChart data={recoveredData} name="Recovered" />
        </div>
      </div>
    );
  }
};

export default Chart;
