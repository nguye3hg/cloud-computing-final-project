import React, { useState } from "react";
import axios from "axios";
import "./TransactionsPage.css"; // Add this line for CSS

const TransactionsPage = () => {
  const [hshdNum, setHshdNum] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://65kyqvpxpcnthqwsc34hskxfqu0odmzw.lambda-url.us-east-1.on.aws/",
        { params: { hshd_num: hshdNum } }
      );

      const resultData = response.data; // Access the data field directly
      setData(resultData);
    } catch (err) {
      console.error("Error Fetching Data:", err);
      setError("Error fetching data.");
    }
    setLoading(false);
  };

  return (
    <div className="transactions-page">
      <h1>Household Transactions</h1>
      <div className="input-container">
        <input
          type="text"
          value={hshdNum}
          onChange={(e) => setHshdNum(e.target.value)}
          placeholder="Enter Household Number"
          className="input-field"
        />
        <button onClick={fetchData} className="fetch-button">
          Fetch Data
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Hshd_num</th>
              <th>Basket_num</th>
              <th>Date</th>
              <th>Product_num</th>
              <th>Department</th>
              <th>Commodity</th>
              <th>Spend</th>
              <th>Units</th>
              <th>Store_region</th>
              <th>Week_num</th>
              <th>Year</th>
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
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Hshd_num}</td>
                  <td>{item.Basket_num}</td>
                  <td>{item.Date || "N/A"}</td>
                  <td>{item.Product_num}</td>
                  <td>{item.Department?.trim()}</td>
                  <td>{item.Commodity?.trim()}</td>
                  <td>{item.Spend}</td>
                  <td>{item.Units}</td>
                  <td>{item.Store_region?.trim()}</td>
                  <td>{item.Week_num}</td>
                  <td>{item.Year}</td>
                  <td>{item.Loyalty_flag}</td>
                  <td>{item.Age_range}</td>
                  <td>{item.Marital_status}</td>
                  <td>{item.Income_range}</td>
                  <td>{item.Homeowner_desc}</td>
                  <td>{item.Hshd_composition}</td>
                  <td>{item.Hshd_size}</td>
                  <td>{item.Children}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
