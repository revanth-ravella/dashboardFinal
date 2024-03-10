import React from "react";
import "./DashboardComponent.scss";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
);
function DashboardComponent({
  region,

  countryNameData,
  topicsData,

  barData,
  pieData,
}) {
  const h4Elements = countryNameData.map((element, index) => (
    <h4 key={index}>{element}</h4>
  ));
  const h5Elements = topicsData.map((element, index) => (
    <h4 key={index}>{element}</h4>
  ));

  return (
    <div className="data">
      <div className="box1">
        <div className="region">
          <h4>Region : {region}</h4>
        </div>
        <div className="data_inside">
          <div className="grid-item1">
            <h3>Country List</h3>
            <div className="country_list">{h4Elements}</div>
          </div>
          <div className="grid-item2">
            <div class="bar-chart">
              <Bar data={barData} />
            </div>
          </div>
          <div className="grid-item1">
            <h3>TOPICS</h3>
            <div className="country_list">{h5Elements}</div>
          </div>
          <div className="grid-item4">
            <div class="pie-chart">
              <Doughnut data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
