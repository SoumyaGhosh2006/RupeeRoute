import "./styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar glass">Sidebar</div>

      <div className="main">
        <div className="topbar glass">Topbar</div>

        <div className="cards">
          <div className="glass card">Score</div>
          <div className="glass card">Charts</div>
        </div>

        <div className="bottom">
          <div className="glass chat">Chat</div>
          <div className="glass form">Expense Form</div>
        </div>
      </div>
    </div>
  );
}