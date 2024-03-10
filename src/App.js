import React, { useState, useEffect } from "react";
import "./App.scss";
import { FaFilter } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LiaCopyrightSolid } from "react-icons/lia";
import { DashboardScreen } from "./Screens/DashboardScreen";
import FilterScreen from "./Screens/FilterScreen";

function App() {
  const [JsonData, setJsonData] = useState();

  function fetchDataAndSetJsonData() {
    fetch("http://localhost:5000/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        // Handle the parsed JSON data
        setJsonData(data); // Set the JSON data using the provided setter function
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  useEffect(() => {
    if (JsonData === null || JsonData === undefined) {
      fetchDataAndSetJsonData();
    }
  }, [JsonData]);

  const [isDashboardActive, setDashboardActive] = useState(true);
  const [isDataActive, setDataActive] = useState(false);
  const [filters, setFilters] = useState({
    regions: [],
    countries: [],
    pestles: [],
    sectors: [],
    sources: [],
    topics: [],
  });

  const handleDashboardClick = () => {
    setDashboardActive(!isDashboardActive);
    setDataActive(false); // Reset data icon
  };

  const handleDataClick = () => {
    setDataActive(!isDataActive);
    setDashboardActive(false); // Reset dashboard icon
  };

  return (
    <>
      {JsonData && (
        <div class="container">
          <div class="sidebar">
            <div className="logo">
              <FaLightbulb className="logo_icon" />
              <h3>Insight Hub</h3>
            </div>
            <div className="sidebar_data">
              <div
                className={`dashboard_icon ${
                  isDashboardActive ? "active" : ""
                }`}
                onClick={handleDashboardClick}
              >
                <MdSpaceDashboard className="dashboardicon_inside" />
                <h5>Dashboard</h5>
              </div>

              <div
                className={`data_icon ${isDataActive ? "active" : ""}`}
                onClick={handleDataClick}
              >
                <FaFilter className="dashboardicon_inside" />
                <h5>Filter</h5>
              </div>
            </div>
            <div className="copyrights">
              <LiaCopyrightSolid className="copy_icon" />
              <p>DESIGN BY DARSHAN</p>
            </div>
          </div>
          <div className="header">
            <h1>Dashboard</h1>
          </div>
          <div className="bodyContent">
            {isDashboardActive && (
              <DashboardScreen
                filters={filters}
                setFilters={setFilters}
                JsonData={JsonData}
              />
            )}
            .
            {isDataActive && (
              <FilterScreen
                filters={filters}
                setFilters={setFilters}
                JsonData={JsonData}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
