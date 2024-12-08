import React, { useState, useEffect } from "react";
import axios from "axios";

const BasketAnalysis = () => {
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodities, setSelectedCommodities] = useState([]);
  const [combinationsCount, setCombinationsCount] = useState(0);

  useEffect(() => {
    axios
      .post(
        "https://4rqwydfon5r334yq5foxxaqmhu0iakzb.lambda-url.us-east-1.on.aws/",
        JSON.stringify({ getCommodities: true }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setCommodities(response.data.commodities);
      })
      .catch((error) => {
        console.error("Error fetching commodities:", error);
      });
  }, []);
  const handleSelectionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCommodities((prev) => [...prev, value]);
    } else {
      setSelectedCommodities((prev) =>
        prev.filter((commodity) => commodity !== value)
      );
    }
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://vonnatrwftqvbknubsyznk3uxe0dcakg.lambda-url.us-east-1.on.aws/",
        {
          selectedCommodities: selectedCommodities,
        }
      )
      .then((response) => {
        setCombinationsCount(response.data.combinationsCount);
      })
      .catch((error) => {
        console.error("Error calculating combinations:", error);
      });
  };
  return (
    <div>
      <h1>Select Commodities</h1>
      <div>
        {commodities.map((commodity) => (
          <div key={commodity}>
            <label>
              <input
                type="checkbox"
                value={commodity}
                onChange={handleSelectionChange}
              />
              {commodity}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h2>Selected Commodities</h2>
        <div>{selectedCommodities.join(", ")}</div>

        <h3>Combinations Count: {combinationsCount}</h3>
        <button onClick={handleSubmit}>Calculate Combinations</button>
      </div>
    </div>
  );
};

export default BasketAnalysis;
