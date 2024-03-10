import React, { useState } from "react";

function JsonData() {
  fetch("http://localhost:5000/api/data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse response as JSON
    })
    .then((Data) => {
      // console.log(jsonData); // Log the parsed JSON data
      return jsonData; // Return the JSON data for further processing if needed
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

export default JsonData;
