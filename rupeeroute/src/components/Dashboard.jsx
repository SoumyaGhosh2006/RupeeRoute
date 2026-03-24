import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpensePie from "./Charts/ExpensePie";
import "../styles/dashboard.css";
import "../styles/glass.css";

export default function Dashboard() {
  const [expenseData, setExpenseData] = useState(null);

  const chartData = expenseData
    ? [
        { name: "Rent", value: expenseData.rent },
        { name: "Food", value: expenseData.food },
        { name: "Travel", value: expenseData.travel },
      ]
    : [];

  const totalExpense = expenseData
    ? expenseData.rent + expenseData.food + expenseData.travel
    : 0;

  const highestSpending = expenseData
    ? Object.entries(expenseData).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    : null;

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
            {expenseData ? (
              <ExpensePie data={chartData} />
            ) : (
              <p className="muted">Enter values below to visualize your spend.</p>
            )}
          </div>
        </section>

        <section className="bottom">
          <div className="glass form">
            <h4>Enter Expenses</h4>
            <ExpenseForm setData={setExpenseData} />
          </div>

          <div className="glass card insights-card">
            <h4>Insights</h4>
            {expenseData ? (
              <ul>
                <li>Total Expense: Rs {totalExpense}</li>
                <li>Highest Spending: {highestSpending}</li>
              </ul>
            ) : (
              <p className="muted">No insights yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
