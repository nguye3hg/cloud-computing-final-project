import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionsPage from "./components/TransactionsPage/TransactionsPage";
import ChurnAnalysis from "./components/ChurnAnalysis/ChurnAnalysis";
import BasketAnalysis from "./components/BasketAnalysis/BasketAnalysis";
import { useState } from "react";

Amplify.configure(awsExports);

export default function App() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  return (
    <Authenticator signUpAttributes={["email"]}>
      {({ signOut, user }) => (
        <div>
          {user ? (
            <div>
              <h1>Welcome, {user.username}</h1>

              <div style={{ marginBottom: "20px" }}>
                <button
                  onClick={() => setActiveComponent("Dashboard")}
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    backgroundColor:
                      activeComponent === "Dashboard" ? "#007bff" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveComponent("TransactionsPage")}
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    backgroundColor:
                      activeComponent === "TransactionsPage"
                        ? "#007bff"
                        : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setActiveComponent("ChurnAnalysis")}
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",

                    backgroundColor:
                      activeComponent === "ChurnAnalysis" ? "#007bff" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Churn Analysis
                </button>
                <button
                  onClick={() => setActiveComponent("BasketAnalysis")}
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      activeComponent === "BasketAnalysis" ? "#007bff" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  BasketAnalysis - AI/ML Version
                </button>
              </div>

              {activeComponent === "Dashboard" && <Dashboard />}
              {activeComponent === "TransactionsPage" && <TransactionsPage />}
              {activeComponent === "ChurnAnalysis" && <ChurnAnalysis />}
              {activeComponent === "BasketAnalysis" && <BasketAnalysis />}

              <button
                onClick={signOut}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <h1>Please log in to access the Dashboard.</h1>
          )}
        </div>
      )}
    </Authenticator>
  );
}
