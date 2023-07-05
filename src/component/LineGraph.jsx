// LineGraph.jsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => res.json())
      .then((res) => {
        setData(res.cases);
      });
  }, []);
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="line-graph">
      <h2 className="graph-title">Line graph shows the cases fluctuations</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineGraph;
