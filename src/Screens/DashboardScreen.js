import { React, useEffect, useState } from "react";
import "./Dashboard.scss";

import DashboardComponent from "../components/DashboardComponent";


function DashboardScreen({ filters ,JsonData }) {


  function extractUniqueValuesComplete(data, property) {
    const resultSet = new Set();
    data.forEach((entry) => {
      const value = entry[property];
      resultSet.add(value);
    });
    return Array.from(resultSet);
  }
  const regionsArrayComplete = extractUniqueValuesComplete(JsonData, "region");
  // const topicsArrayComplete = extractUniqueValuesComplete(JsonData, "topic");
  // const pestlesArrayComplete = extractUniqueValuesComplete(JsonData, "pestle");
  // const sectorsArrayComplete = extractUniqueValuesComplete(JsonData, "sector");
  // const sourcesArrayComplete = extractUniqueValuesComplete(JsonData, "source");
  // const countriesArrayComplete = extractUniqueValuesComplete(
  //   JsonData,
  //   "country"
  // );
  console.log("Filters in dashboard screen: ", filters, regionsArrayComplete);
  const [regData, setRegData] = useState(
    filters.regions.length
      ? regionsArrayComplete.filter((item) => filters.regions.includes(item))
      : regionsArrayComplete
  );

  const DashboardData = regData.map((element) => {
    const country = new Set();
    const topics = new Set();
    const sourceCounts = {};
    const pestleCounts = {};

    JsonData.forEach((entry) => {
      if (
        entry.region === element &&
        (filters.regions.includes(entry.region) ||
          filters.regions.length === 0) &&
        (filters.countries.includes(entry.country) ||
          filters.countries.length === 0) &&
        (filters.topics.includes(entry.topic) || filters.topics.length === 0) &&
        (filters.pestles.includes(entry.pestle) ||
          filters.pestles.length === 0) &&
        (filters.sources.includes(entry.source) || filters.sources.length === 0)
      ) {
        country.add(entry.country);
        topics.add(entry.topic);
        sourceCounts[entry.source] = (sourceCounts[entry.source] || 0) + 1;
        pestleCounts[entry.pestle] = (pestleCounts[entry.pestle] || 0) + 1;
      }
    });


    const countryList = [...country];
    const topicsList = [...topics];
    const data = {
      labels: Object.keys(sourceCounts),
      datasets: [
        {
          label: "Source",
          data: Object.values(sourceCounts), // Random data for demonstration
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 10)",
            "rgba(255, 159, 64, 10)",
            "rgba(255, 205, 86, 10)",
            "rgba(75, 192, 192, 10)",
            "rgba(54, 162, 235, 10)",
            "rgba(153, 102, 255, 10)",
            "rgba(201, 203, 207, 10)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
        },
      ],
    };
    const data1 = {
      labels: Object.keys(pestleCounts),
      datasets: [
        {
          label: "My First Dataset",
          data: Object.values(pestleCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 10)",
            "rgba(255, 159, 64, 10)",
            "rgba(255, 205, 86, 10)",
            "rgba(75, 192, 192, 10)",
            "rgba(54, 162, 235, 10)",
            "rgba(153, 102, 255, 10)",
            "rgba(201, 203, 207, 10)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <DashboardComponent
        region={element}
        countryNameData={countryList}
        topicsData={topicsList}
        barData={data}
        pieData={data1}
      />
    );
  });

  return <>{DashboardData}</>;
}

export { DashboardScreen };
