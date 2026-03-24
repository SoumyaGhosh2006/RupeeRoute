import { useState } from "react";
import ChatBox from "./ChatBox";
import ExpenseForm from "./ExpenseForm";
import ExpensePie from "./Charts/ExpensePie";
import { calculateFinanceMetrics } from "../utils/finance";
import "../styles/dashboard.css";
import "../styles/glass.css";

export default function Dashboard() {
  const [expenseData, setExpenseData] = useState(null);

  const metrics = expenseData ? calculateFinanceMetrics(expenseData) : null;

  const chartData = metrics
    ? [
        { name: "Rent", value: metrics.rent },
        { name: "Food", value: metrics.food },
        { name: "Travel", value: metrics.travel },
      ]
    : [];

  return (
    <div className="dashboard">
      <aside className="sidebar glass">
        <h2>MoneyMind</h2>
        <p className="badge">Dashboard</p>
        <p className="muted">Plan smarter. Spend cleaner.</p>
      </aside>

      <main className="main">
        <header className="topbar glass">
          <h3>Financial Overview</h3>
          <p>Your expense cockpit with glass-metal visuals</p>
        </header>

        <section className="cards">
          <div className="glass card chart-card">
            <h4>Expense Breakdown</h4>
            {metrics ? (
              <ExpensePie data={chartData} />
            ) : (
              <p className="muted">Enter values below to visualize your spend.</p>
            )}
          </div>

          <div className="glass card health-card">
            <h4>Money Health Score</h4>
            {metrics ? (
              <>
                <p className="health-score">{metrics.score}/100</p>
                <p className="health-band">{metrics.band}</p>
                <p className="muted">{metrics.recommendation}</p>
              </>
            ) : (
              <p className="muted">Submit your monthly values to compute your health score.</p>
            )}
          </div>
        </section>

        <section className="bottom">
          <div className="glass form">
            <h4>Enter Monthly Finance Data</h4>
            <ExpenseForm setData={setExpenseData} />
          </div>

          <div className="glass card insights-card">
            <h4>Insights</h4>
            {metrics ? (
              <ul>
                <li>Total Expense: Rs {metrics.totalExpense}</li>
                <li>Actual Savings: Rs {metrics.actualSavings}</li>
                <li>Actual Savings Rate: {metrics.actualSavingsRate}%</li>
                <li>Target Savings Amount: Rs {metrics.targetSavingsAmount}</li>
                <li>Target Status: {metrics.meetsTarget ? "On Track" : "Behind"}</li>
                <li>Highest Spending: {metrics.highestSpending}</li>
              </ul>
            ) : (
              <p className="muted">No insights yet.</p>
            )}
          </div>
        </section>

        <ChatBox context={metrics} disabled={!metrics} />
      </main>
    </div>
  );
}
