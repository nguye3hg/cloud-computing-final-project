import "./ChurnAnalysis.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export default function ChurnAnalysis() {
  const [churnData, setChurnData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://bm4exybpdy4ddf3ijyzmo75eaa0wsatg.lambda-url.us-east-1.on.aws/",
        { params: { type: "churn" } }
      )
      .then((response) => {
        console.log(response.data);
        setChurnData(response.data);
      })
      .catch((error) => console.error("Error fetching churn data:", error));
  }, []);
  return (
    <div className="ChurnAnalysis">
      <h2>High Churn Risk Households</h2>
      <table>
        <thead>
          <tr>
            <th>Household ID</th>
            <th>Last Purchase Year</th>
            <th>Last Purchase Week</th>
            <th>Days Since Last Purchase</th>
            <th>Total Transactions</th>
          </tr>
        </thead>
        <tbody>
          {churnData.map((household) => (
            <tr key={household.householdId}>
              <td>{household.householdId}</td>
              <td>{household.lastPurchaseYear}</td>
              <td>{household.lastPurchaseWeek}</td>
              <td>{household.daysSinceLastPurchase}</td>
              <td>{household.totalTransactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
