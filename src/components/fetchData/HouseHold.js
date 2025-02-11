import React, { useState } from "react";
import axios from "axios";

const HouseholdData = () => {
  const [hshdNum, setHshdNum] = useState("");
  const [householdData, setHouseholdData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch data from Lambda Function URL
      const response = await axios.get(
        "https://65kyqvpxpcnthqwsc34hskxfqu0odmzw.lambda-url.us-east-1.on.aws/",
        {
          params: { hshd_num: hshdNum },
        }
      );

      setHouseholdData(JSON.parse(response.data.body));
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please check the household number.");
    }
  };

  return (
    <div>
      <h1>Household Data Viewer</h1>
      <div>
        <label htmlFor="hshdNum">Enter Household Number:</label>
        <input
          type="number"
          id="hshdNum"
          value={hshdNum}
          onChange={(e) => setHshdNum(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {householdData && (
        <div>
          <h2>Household Data</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Hshd_num</th>
                <th>Loyalty_flag</th>
                <th>Age_range</th>
                <th>Marital_status</th>
                <th>Income_range</th>
                <th>Homeowner_desc</th>
                <th>Hshd_composition</th>
                <th>Hshd_size</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              {householdData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Hshd_num}</td>
                  <td>{row.Loyalty_flag}</td>
                  <td>{row.Age_range}</td>
                  <td>{row.Marital_status}</td>
                  <td>{row.Income_range}</td>
                  <td>{row.Homeowner_desc}</td>
                  <td>{row.Hshd_composition}</td>
                  <td>{row.Hshd_size}</td>
                  <td>{row.Children}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HouseholdData;
