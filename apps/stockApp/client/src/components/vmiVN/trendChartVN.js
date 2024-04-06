/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
//dont delete import chart
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import vmiContext from "../../context/vmi-context";

const TrendChart = () => {
  const { dataTrendChart } = useContext(vmiContext);
  const [trendChart, setTrendChart] = useState({});

  const [index, setIndex] = useState(1);
  const [X, setX] = useState([]);
  const [Y, setY] = useState([]);
  const [label, setLabel] = useState("");

  const chartData = {
    labels: X,
    datasets: [
      {
        label: label,
        backgroundColor: "#0dcaf0",
        borderColor: "#0dcaf0",
        borderWidth: 2,
        data: Y,
      },
    ],
  };

  const handleChange = (e) => {
    setIndex(e.target.value);
  };

  useEffect(() => {
    setTrendChart(dataTrendChart);
  }, [dataTrendChart]);

  useEffect(() => {
    let value = {};
    switch (index) {
      case "totalRevenue":
        setLabel("Revenue");
        value = trendChart.revenue;
        break;
      case "netIncome":
        setLabel("Net Income");
        value = trendChart.netIncome;
        break;
      case "operatingCashflow":
        setLabel("Cash flow from operation");
        value = trendChart.operatingCashflow;
        break;

      case "freeCashflow":
        setLabel("Free CashFlow");
        value = trendChart.freeCashFlow;
        break;
      default:
        setLabel("Revenue");
        value = trendChart.revenue;
        break;
    }
    setX(trendChart.period);
    setY(value);
  }, [index, trendChart]);

  return (
    <div>
      <ButtonGroup value={index} onClick={handleChange}>
        <Button variant="secondary" value="totalRevenue">
          Total Revenue
        </Button>
        <Button variant="secondary" value="netIncome">
          Net Income
        </Button>
        <Button variant="secondary" value="operatingCashflow">
          OperatingCashFlow
        </Button>
        <Button variant="secondary" value="freeCashflow">
          FreeCashFlow
        </Button>
      </ButtonGroup>

      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Chart for VMI",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default TrendChart;
