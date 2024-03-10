import React, { useEffect, useState } from "react"; // Import useState
import "./FilterComponent.scss";




function FilterComponent({ regions, regionsdata, filters, setFilters }) {

  console.log(filters[regions.toLowerCase()], regions.toLowerCase());

  const [selectedItems, setSelectedItems] = useState(
    filters[regions.toLowerCase()]
  ); // State to keep track of the selected items

  // Function to handle click event
  const handleClick = (index, element) => {
    if (!selectedItems.includes(element))
      setSelectedItems([...selectedItems, element]);
    else setSelectedItems(selectedItems.filter((e) => e !== element));
  };
  useEffect(() => {
    // setFilters(selectedItems);
    let filData = { ...filters };
    filData[regions.toLowerCase()] = selectedItems;
    setFilters({
      ...filData,
    });


    console.log(filters);

  }, [selectedItems]);

  const h5Elements = regionsdata.map((element, index) => (
    <h5
      className={`filter_value ${
        selectedItems.includes(element) ? "darkBackground" : ""
      }`} // Apply dark background when index is in selectedItems array
      key={element}
      id={index}
      onClick={() => handleClick(index, element)}
    >
      {element}
    </h5>
  ));

  return (
    <div className="filter_data">
      <h2>{regions}</h2>
      <div className="filter_data_content">{h5Elements}</div>
    </div>
  );
}

export { FilterComponent };
