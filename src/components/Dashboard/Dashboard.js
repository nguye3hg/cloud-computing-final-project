import "./Dashboard.css";
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

const Dashboard = () => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [basketData, setBasketData] = useState([]);
  const [brandPreferencesData, setBrandPreferencesData] = useState([]);

  useEffect(() => {
    // Fetch data for Demographics
    axios
      .get(
        "https://iqhygos7z4z6qovpdqijihjm4a0zjcmq.lambda-url.us-east-1.on.aws/",
        { params: { type: "demographics" } }
      )
      .then((response) => {
        setDemographicsData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching demographics data:", error)
      );

    // Fetch data for Engagement
    axios
      .get(
        "https://iqhygos7z4z6qovpdqijihjm4a0zjcmq.lambda-url.us-east-1.on.aws/",
        { params: { type: "engagement" } }
      )
      .then((response) => {
        setEngagementData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching engagement data:", error)
      );

    // Fetch data for Basket Analysis
    axios
      .get(
        "https://iqhygos7z4z6qovpdqijihjm4a0zjcmq.lambda-url.us-east-1.on.aws/",
        { params: { type: "basket" } }
      )
      .then((response) => {
        setBasketData(response.data);
      })
      .catch((error) => console.error("Error fetching basket data:", error));

    // Fetch data for Brand Preferences
    axios
      .get(
        "https://iqhygos7z4z6qovpdqijihjm4a0zjcmq.lambda-url.us-east-1.on.aws/",
        { params: { type: "brandPreferences" } }
      )
      .then((response) => {
        setBrandPreferencesData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching brand preferences data:", error)
      );
  }, []);

  // Demographics Chart
  const demographicsChart = {
    labels: demographicsData.map((d) => `Size: ${d.householdSize}`),
    datasets: [
      {
        label: "Average Spending",
        data: demographicsData.map((d) => d.spending),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
    options: {
      plugins: {
        title: {
          display: true,
          text: "Demographics and Average Spending", // Chart Title
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Household Size", // X-axis Label
          },
        },
        y: {
          title: {
            display: true,
            text: "Average Spending ($)", // Y-axis Label
          },
        },
      },
    },
  };

  // Engagement Over Time Chart
  const engagementChart = {
    labels: engagementData.map((d) => `Year: ${d.Year}`),
    datasets: [
      {
        label: "Total Spending",
        data: engagementData.map((d) => d.totalSpending),
        borderColor: "rgba(153,102,255,0.6)",
        backgroundColor: "rgba(153,102,255,0.4)",
        fill: true,
      },
    ],
    options: {
      plugins: {
        title: {
          display: true,
          text: "Engagement Over Time", // Chart Title
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Year", // X-axis Label
          },
        },
        y: {
          title: {
            display: true,
            text: "Total Spending ($)", // Y-axis Label
          },
        },
      },
    },
  };

  // Basket Analysis Chart
  const basketChart = {
    labels: basketData.map((d) => d.productCombination),
    datasets: [
      {
        label: "Frequency",
        data: basketData.map((d) => d.frequency),
        backgroundColor: "rgba(255,159,64,0.6)",
      },
    ],
    options: {
      plugins: {
        title: {
          display: true,
          text: "Basket Analysis", // Chart Title
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Product Combinations", // X-axis Label
          },
        },
        y: {
          title: {
            display: true,
            text: "Frequency", // Y-axis Label
          },
        },
      },
    },
  };

  // Brand Preferences Chart
  const brandChart = {
    labels: brandPreferencesData.map((d) => d.brandType),
    datasets: [
      {
        label: "Spending by Brand",
        data: brandPreferencesData.map((d) => d.totalSpend),
        backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
      },
    ],
    options: {
      plugins: {
        title: {
          display: true,
          text: "Brand Preferences", // Chart Title
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Brand Type", // X-axis Label
          },
        },
        y: {
          title: {
            display: true,
            text: "Total Spending ($)", // Y-axis Label
          },
        },
      },
    },
  };

  return (
    <div className="RetailDashboard">
      <div className="Demographics">
        <div>
          <h2>Demographics</h2>
          <Bar data={demographicsChart} options={demographicsChart.options} />
        </div>
      </div>
      <div className="EngagementOverTime">
        <div>
          <h2>Engagement Over Time</h2>
          <Line data={engagementChart} options={engagementChart.options} />
        </div>
      </div>
      <div className="BasketAnalysis">
        <div>
          <h2>Basket Analysis</h2>
          <Bar data={basketChart} options={basketChart.options} />
        </div>
      </div>
      <div className="BrandPreferences">
        <div>
          <h2>Brand Preferences</h2>
          <Pie data={brandChart} options={brandChart.options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
